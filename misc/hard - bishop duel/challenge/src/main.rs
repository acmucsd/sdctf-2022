use std::io::{stdout, Write};
use std::process::exit;
use std::thread::sleep;
use std::time::Duration;

/*
 * Can you tell this was my first rust program ever? lmao
 */

use crossterm::{cursor, execute, queue, style, terminal::{Clear, EnterAlternateScreen, LeaveAlternateScreen}};
use crossterm::terminal::ClearType;
use rand::{rngs, SeedableRng};
use rand::prelude::SliceRandom;
use text_io::read;

static TITLE_SCREEN: &str = "
       o
      (^)
     -=H=-          BISHOP DUEL
      ] [   -- press enter to start --
     /___\\
";

// having to double escape these backslashes makes this astoundingly ugly
static BOARD: &str = "
\\__\\\\\\\\__\\\\\\\\__\\\\\\\\__\\\\\\\\      Q#      - up left # spaces
 \\\\\\\\__\\\\\\\\__\\\\\\\\__\\\\\\\\__\\         E#  - up right # spaces
  \\__\\\\\\\\__\\\\\\\\__\\\\\\\\__\\\\\\\\    Z#      - down left # spaces
   \\\\\\\\__\\\\\\\\__\\\\\\\\__\\\\\\\\__\\       C#  - down right # spaces
    \\__\\\\\\\\__\\\\\\\\__\\\\\\\\__\\\\\\\\
     \\\\\\\\__\\\\\\\\__\\\\\\\\__\\\\\\\\__\\       D - offer draw
      \\__\\\\\\\\__\\\\\\\\__\\\\\\\\__\\\\\\\\      R - resign
       \\\\\\\\__\\\\\\\\__\\\\\\\\__\\\\\\\\__\\

";

enum Direction {
    UpLeft, UpRight, DownLeft, DownRight
}

struct Bishop {
    position: u16
}

impl Bishop {
    fn get_xy(&self) -> (u16, u16) {
        let rows = self.position / 8 + 1;
        return ((self.position % 8) * 3 + rows, rows);
    }

    fn move_position(&mut self, dir: Direction, dist: u16) -> bool {
        let position_multiplier: i32 = match dir {
            Direction::UpRight => -7,
            Direction::DownLeft => 7,
            Direction::UpLeft => -9,
            Direction::DownRight => 9,
        };

        let new_position = i32::from(self.position) + position_multiplier * i32::from(dist);

        // make sure we don't exceed the bottom and top of the chessboard
        if new_position < 0 || new_position > 64 { return false; }
        // make sure we don't exceed the left and right edge of the chessboard
        match dir {
            Direction::UpLeft | Direction::DownLeft => {
                if self.position % 8 < dist { return false; }
            }
            Direction::UpRight | Direction::DownRight => {
                if dist + self.position % 8 > 8 { return false; }
            }
        }

        self.position = u16::try_from(new_position).unwrap();
        return true;
    }
}

fn pause(msg: &str) -> String {
    println!("{}", msg);
    read!("{}\n")
}


fn main() {
    let mut stdout = stdout();

    let mut is_player_turn = true;

    let mut white_bishop = Bishop { position: 5 };
    let mut black_bishop = Bishop { position: 57 };

    queue!(stdout, EnterAlternateScreen, Clear(ClearType::All), style::Print(TITLE_SCREEN)).unwrap();
    stdout.flush().unwrap();
    pause("");

    loop {
        let (bb_x, bb_y) = black_bishop.get_xy();
        let (ww_x, ww_y) = white_bishop.get_xy();
        queue!(
            stdout,
            Clear(ClearType::All),
            cursor::MoveTo(0, 0),
            style::Print(BOARD),
            cursor::MoveTo(bb_x, bb_y),
            style::Print("BB"),
            cursor::MoveTo(ww_x, ww_y),
            style::Print("WW"),
            cursor::MoveTo(0, 10)
        ).unwrap();
        stdout.flush().unwrap();

        // this means SOMEBODY has been captured
        if white_bishop.position == black_bishop.position {
            if is_player_turn {
                pause("You have been defeated! Your flag is sdctf{L0SiNG_1S_haLF_th3_BaTTl3}");
                exit(0);
            }
            pause("You have claimed victory! Your flag is sdctf{bUt_w1nn1ng_1S_pr3ttY_niC3_T00}");
            exit(0);
        }

        if is_player_turn {
            // if its the white bishop's turn
            execute!(stdout, style::Print("You are the white bishop. Input move > ")).unwrap();
            let command: String = read!("{}\n");

            let mut command_chars = command.chars();
            if let Some(c1) = command_chars.next() {
                match c1 {
                    'r' | 'R' => {
                        pause("A brave bishop shall never resign!");
                    },
                    'd' | 'D' => {
                        execute!(stdout, style::Print("The black bishop is thinking.")).unwrap();
                        sleep(Duration::from_millis(1000));
                        execute!(stdout, style::Print(".")).unwrap();
                        sleep(Duration::from_millis(1000));
                        execute!(stdout, style::Print(".")).unwrap();
                        sleep(Duration::from_millis(1000));
                        pause("Accepted! The game is a draw!");
                        break;
                    },
                    _ => {
                        let direction: Direction = match c1 {
                            'e' | 'E' => Direction::UpRight,
                            'z' | 'Z' => Direction::DownLeft,
                            'q' | 'Q' => Direction::UpLeft,
                            'c' | 'C' => Direction::DownRight,
                            _ => continue
                        };
                        let distance = match command_chars.next() {
                            None => continue,
                            Some(c2) => match c2.to_digit(10) {
                                None => continue,
                                Some(d) => d as u16
                            }
                        };

                        let successful = white_bishop.move_position(direction, distance);
                        if successful {
                            // now its the black bishop's turn
                            is_player_turn = false;
                        }
                    }
                }
            }
        } else {
            // black bishop's turn
            println!("The black bishop is thinking...");
            sleep(Duration::from_millis(1000));

            // get all black spaces and filter by currently accessible
            let curr = i32::from(black_bishop.position);
            let mut possible_positions =
                (0..64).step_by(2)
                    .map(|i| if (i/8) % 2 == 0 { i } else { i+1 })
                    .filter(|i| (curr - i).abs() % 7 == 0 || (curr - i).abs() % 9 == 0).collect::<Vec<i32>>();

            // if the white bishop is in our path, CRUSH THEM
            if possible_positions.contains(&i32::from(white_bishop.position)) {
                black_bishop.position = white_bishop.position;
                is_player_turn = true;
                continue;
            }

            // otherwise, let's filter out moves that would put us in the path of the white bishop
            let white_curr = i32::from(white_bishop.position);
            if white_curr % 2 == 0 {
                possible_positions = possible_positions.into_iter()
                    .filter(|i| (white_curr - i) % 7 != 0 && (white_curr - i) % 9 != 0).collect::<Vec<i32>>();
            }

            // otherwise, randomly select a new move
            let mut rng = rngs::StdRng::seed_from_u64(white_bishop.position as u64);
            let new_position = possible_positions.choose(&mut rng).unwrap();
            black_bishop.position = u16::try_from(*new_position).unwrap();

            // now its the white bishop's turn
            is_player_turn = true;
        }
    }

    execute!(stdout, LeaveAlternateScreen).unwrap();
}

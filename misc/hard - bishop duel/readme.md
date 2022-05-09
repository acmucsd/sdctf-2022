# Bishop Duel
## MISC - Hard
| author | first blood | solves | points |
| --- | --- | --- | --- |
| Aaron James | _ | 0 | 0 |
### prompt
2 bishops on the chessboard.

**Goal 1 (first flag)**: Lose the game by letting your bishop be captured.

**Goal 2 (second flag)**: Win by capturing the other bishop.

Avoiding a draw is easy huh? But wait...

**Connect via:**
`nc bishop.sdc.tf 1337`

### original specification
Place the 2 bishops adjacent to each other in a cardinal direction (that is, not diagonal). This way the 2 bishops are on differently colored squares: there is no way one can even reach another. The participant can move their bishop (white) in any diagonal directions for any number of steps (which they can specify). There is bound checking to prevent going off board/wrap around, but it only work some of the time (notably there is an integer overflow error that allows you to bypass check if the number of squares to move is large enough). The script is written in Java so pwn is impossible, and it will actually check the index to be in [0,63] (64 = 8 x 8). (index is stored as one number instead of 2). However wraparound around borders is still possible. Notably it has an off-by-one-error that will allow one to move past the rightmost border and wrap around to the left. This allows a participant to break out of their invariant parity and attack the black bishop.

The black bishop is driven by a very dumb AI (source code is revealed) using a pseudorandom number generator (with seed driven from the white bishop's movement and some fixed initial value) for random movement. Movement is only random when it cannot attack the white bishop, otherwise it will attack the white bishop and the participant gets the first flag.

To distract the player, there is a resign button that doesn't work (says: A brave bishop shall never resign! You are not getting the first flag that easy) and there is an "offer draw" button and the black bishop will always accept. The black bishop has some sleep statements to (with progress bar made of ...) to simulate thinking (time being random), even on an offer to draw.

You get the first flag by losing (making the black bishop capture the player: the white bishop), the first flag unlocks a second challenge that asks you to win the duel (capture the black bishop), which require running a local brute force search to find moves that lead to the black bishop moving into the white bishop's way (or by trying many times).

After taking the other bishop one will win and get the second flag.

**flag:** `sdctf{L0SiNG_1S_haLF_th3_BaTTl3}
sdctf{bUt_w1nn1ng_1S_pr3ttY_niC3_T00}`


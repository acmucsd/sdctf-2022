#include <iostream>
#include <fstream>
#include <cstdlib>
#include <vector>
#include <numeric>
#include <algorithm>

using std::cout;
using std::cin;
using std::cerr;
using std::endl;
using std::string;
using std::ifstream;
using std::size_t;
using std::vector;

#define L 0
#define D 1
#define R 2
#define B 4
#define U 5
#define F 6

#define NUM_CUBE_TILES 48

// Stores the cube moves in Singmaster notation: F, B, L, R, U, D, in an obfuscated way
string magic_words = "ldr buf";
// Stores the cube permutation
vector<int> magic_array(NUM_CUBE_TILES);

void fail() {
    cout << "No flag for you!" << endl;
    std::exit(0);
}

// Cycle performance function
void magic1(vector<int> cycle) {
    std::reverse(cycle.begin(), cycle.end());
    
    int prev = -1;
    for (int j : cycle) {
        int i = j - 1; // Convert to 0-based
        if (prev != -1) {
            std::swap(magic_array[i], magic_array[prev]);
        }
        prev = i;
    }
}

void setup_magic() {
    std::iota(magic_array.begin(), magic_array.end(), 0);
    // Start generated scramble
    magic1({1, 25, 40, 17, 32, 22, 35, 8, 46, 6, 48, 16, 9, 19, 14, 11, 38, 41});
    magic1({2, 18, 31, 23, 47, 4, 12, 15, 29, 21, 26});
    magic1({3, 43, 33, 24, 27, 30});
    magic1({5, 34, 7, 45, 42, 39, 10, 37, 44, 36, 28});
    // End generated scramble
}

void print_flag(const char *filename) {
    ifstream flag (filename);
    if (!flag.is_open()) {
        cout << "ERROR: unable to find or read the flag." << endl;
        std::exit(2);
    }
    string flag_str;
    getline(flag, flag_str);
    cout << flag_str << endl << endl;
}

void test_magic() {
    for (int i = 0; i < NUM_CUBE_TILES; i++) {
        if (magic_array[i] != i)
            fail();
    }
    print_flag("flag.txt");
}

int main() {
    setup_magic();
    cout << "Enter the magic passphrase for the flag: ";
    cout.flush();
    string password;
    std::getline(cin, password);

    for (char move : password) {
        size_t pos = magic_words.find(move);
        switch (pos) {
        // Start generated cases
        case F:
            magic1({6, 25, 43, 16});
            magic1({7, 28, 42, 13});
            magic1({8, 30, 41, 11});
            magic1({17, 19, 24, 22});
            magic1({18, 21, 23, 20});
            break;

        case B:
            magic1({1, 14, 48, 27});
            magic1({2, 12, 47, 29});
            magic1({3, 9, 46, 32});
            magic1({33, 35, 40, 38});
            magic1({34, 37, 39, 36});
            break;

        case L:
            magic1({1, 17, 41, 40});
            magic1({4, 20, 44, 37});
            magic1({6, 22, 46, 35});
            magic1({9, 11, 16, 14});
            magic1({10, 13, 15, 12});
            break;

        case R:
            magic1({3, 38, 43, 19});
            magic1({5, 36, 45, 21});
            magic1({8, 33, 48, 24});
            magic1({25, 27, 32, 30});
            magic1({26, 29, 31, 28});
            break;

        case U:
            magic1({1, 3, 8, 6});
            magic1({2, 5, 7, 4});
            magic1({9, 33, 25, 17});
            magic1({10, 34, 26, 18});
            magic1({11, 35, 27, 19});
            break;

        case D:
            magic1({14, 22, 30, 38});
            magic1({15, 23, 31, 39});
            magic1({16, 24, 32, 40});
            magic1({41, 43, 48, 46});
            magic1({42, 45, 47, 44});
            break;
        
        // End generated cases
        default:
            fail();
            break;
        }
    }

    test_magic();
}

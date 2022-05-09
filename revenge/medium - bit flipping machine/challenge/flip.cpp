#include <iostream>
#include <fstream>
#include <cstdlib>
#include <cctype>

using std::cout;
using std::cin;
using std::cerr;
using std::endl;
using std::string;
using std::ifstream;
using std::size_t;

#define BASE_CHAR 'A'
#define RADIX 26

#ifdef DEBUG_BUILD
#define DEBUG(msg) cerr << msg << endl;
#else
#define DEBUG(msg)
#endif

#define MAX_CODE_LENGTH 1024

void badcode() {
    cout << "Invalid code" << endl;
    std::exit(1);
}

void run_challenge(string src, string dst) {
    cout << "Change \"" << src << "\" to \"" << dst << "\":" << endl
        << "Enter the secret flip codes for this machine: ";
    cout.flush();
    string flip_codes;
    std::getline(cin, flip_codes);
    // Input validation
    if (flip_codes.length() % 4 || flip_codes.length() > (size_t) MAX_CODE_LENGTH) {
        DEBUG("Flip count is bad");
        badcode();
    }
    // Flip the bits
    for (int i = 0; flip_codes[i]; i += 2) {
        char flip_high = flip_codes[i], flip_low = flip_codes[i+1];
        if (!(std::isupper(flip_high) && std::isupper(flip_low))) {
            DEBUG("Bad character");
            badcode();
        }
        int bit_index = (flip_high - BASE_CHAR) * RADIX + (flip_low - BASE_CHAR);
        int char_index = bit_index / 8;
        if ((size_t) char_index >= src.length()) {
            DEBUG("Flip index out of bounds");
            badcode();
        }
        src[char_index] ^= 0x80 >> (bit_index % 8);
    }
    DEBUG("String after flipping: " << src);
    if (src != dst) {
        cout << "Oh noes. The string isn't flipped correctly." << endl;
        std::exit(1);
    }
    cout << "Good job. You flipped this one correctly.\n" << endl;
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

int main() {
    cout << "Welcome to Bit Flipper. Flip the right bits to change one string to another" << endl;
    cout << "*** Let's start with a warmup ***" << endl;
    run_challenge("rm -rf /trash/", "rm -rf ///////");
    cout << "Good job! Here is an intermediate flag:" << endl;
    print_flag("flag-halfway.txt");
    cout << "*** To get the final flag, complete this harder one. ***" << endl;
    run_challenge("Send Mallory 1000 USD", "Send Mallory 9999 BTC");
    cout << "Mission accomplished! Here is the final flag:" << endl;
    print_flag("flag-final.txt");
}

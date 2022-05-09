#include <stdio.h>

#define STRINGIFY(x) #x
#define MACROSTR(x) STRINGIFY(x)

#define KEY_LENGTH 32

unsigned char enc[] = {0x11,0x76,0xc7,0x6c,0xca,0x66,0x76,0x49,0xa5,0x4e,0x46,0xf8,0x23,0xf8,0x82,0x2c,0xda,0xc5,0xa6,0x36,0xad,0x2a,0x66,0xc8,0x5,0x80,0x8c,0xf,0xf4,0xde,0xd7,0xe7,0x00};

void print_flag(const char *flag_inner) {
    puts("Congratulations. You earned the flag:");
    printf("sdctf{%s}\n", flag_inner);
}

const char *key = MACROSTR(KEY);

void decrypt_flag(unsigned char *key_bytes) {
    for (size_t count = 0; count < KEY_LENGTH; count++) {
        enc[count] ^= key_bytes[count];
    }
}

int main() {
    const char *pos = key;
    unsigned char val[KEY_LENGTH];

    for (size_t count = 0; count < KEY_LENGTH; count++) {
        sscanf(pos, "%2hhx", &val[count]);
        pos += 2;
    }

    decrypt_flag(val);

    print_flag(enc);
    return 0;
}

#include <stdio.h>
#include <malloc.h>
#include <string.h>

int main(int argc, char** argv) {
    if(argc < 3)
        printf("Usage: %s input_file password_file", argv[0]);

    FILE *file = fopen(argv[1], "rb");
    fseek(file, 0, SEEK_END);
    long filelen = ftell(file);
    rewind(file);

    char* buffer = (char *) malloc(filelen * sizeof(char));
    fread(buffer, filelen, 1, file);
    fclose(file);
    
    file = fopen(argv[2], "rb");
    fseek(file, 0, SEEK_END);
    long passlen = ftell(file);
    rewind(file);

    char* pass_buffer = (char *) malloc(passlen * sizeof(char));
    fread(pass_buffer, passlen, 1, file);
    fclose(file);

    for (int i = 0; i < filelen; i++) {
        buffer[i] ^= pass_buffer[i % passlen];
    }

    file = fopen("./enc", "wb");
    fwrite(buffer, filelen, 1, file);
    fclose(file);
    return 0;
}

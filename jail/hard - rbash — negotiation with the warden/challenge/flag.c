#include <stdio.h>

#ifndef FLAG
    #error "FLAG must be defined at compile time"
#endif

// #define FLAG sdctf{test}

#define STRINGIFY(x) #x
#define MACROSTR(x) STRINGIFY(x)

int main(void) {
    puts(MACROSTR(FLAG));
    return 0;
}

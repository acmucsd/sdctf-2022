#include <stdio.h>
#include <string.h>

int FLAG_LEN = 40;
char flag[40];
char guess[40];


void scramble(int times){
        for(int i = 0; i < times; i++){
                flag[i] = flag[i]+1;
        }
}



int main(int argc, char ** argv){
        FILE * f = fopen("flag.txt", "r");
        fgets(flag, 40, f);
        scramble(39);
        puts("can you guess the scrambled flag?");
        fflush(stdout);
        fgets(guess, 40, stdin);
        puts("you guessed: ");
        printf(guess,main,scramble,FLAG_LEN,flag);
        if(strcmp(guess,flag)==0){
                puts("nice guess!");
        }
        else{
                puts("wrong");
        }
}


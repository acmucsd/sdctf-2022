#include <stdio.h>
#include <string.h>

int FLAG_LEN = 59;
char flag[FLAG_LEN];
char guess[FLAG_LEN];


void scramble(int times){
        for(int i = 0; i < times; i++){
                flag[i] = flag[i]+1;
        }
}



int main(int argc, char ** argv){
        FILE * f = fopen("flag.txt", "r");
        fgets(flag, FLAG_LEN, f);
        scramble(FLAG_LEN - 1);
        puts("can you guess the scrambled flag?");
        fflush(stdout);
        fgets(guess, FLAG_LEN, stdin);
        puts("you guessed: ");
        printf(guess,main,scramble,FLAG_LEN,flag);
        if(strcmp(guess,flag)==0){
                puts("nice guess!");
        }
        else{
                puts("wrong");
        }
}


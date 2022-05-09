#include <stdio.h>
#include <string.h>
#include <stdlib.h>


int temp = 0;

int main(int argc, char ** argv){
    char buf[40];
    puts("Welcome to SDCTF's very own text based horoscope");
    puts("please put in your birthday and time in the format (month/day/year/time) and we will have your very own horoscope");
    fflush(stdout);
    fgets(buf, 0x140, stdin);
    processInput(buf);

}

int processInput(char* x){
    int date;
    int time;
    char *month;
    char *token = "/";
    char * a = strtok(x, token);
    for(int i = 0; i < 4; i++){
        if(i == 0){
            date = atoi(a);
        }
        if(i == 3){
            time = atoi(a);
        }
    }
    switch(date){
        case 1:
            month = "January";
            break;
        case 2:
            month = "February";
            break;
        case 3:
            month = "March";
            break;
        case 4:
            month = "April";
            break;
        case 5:
            month = "May";
            break;
        case 6:
            month = "June";
            break;
        case 7:
            month = "July";
            break;
        case 8:
            month = "August";
            break;
        case 9:
            month = "September";
            break;
        case 10:
            month = "October";
            break;
        case 11:
            month = "November";
            break;
        case 12:
            month = "December";
            break;
        default:
        puts("thats not a valid date >:-(");
        fflush(stdout);
        exit(1);
    }
    printf("wow, you were born in the month of %s. I think that means you will have a great week! :)", month);
    fflush(stdout);
}

void test(){
    if(temp == 1){
        system("/bin/sh");
    }
}

int debug(){
    temp = 1;
}

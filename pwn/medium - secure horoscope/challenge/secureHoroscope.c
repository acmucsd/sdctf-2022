#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>

int main(int argc, char ** argv){
    int i = 0;
    char buf[40];
    puts("We fixed some bugs in our last horoscope, this one should be secure!\n");
    puts("To get started, tell us how you feel");
    fflush(stdout);
    fgets(buf, 40, stdin);
    printf("feeling like %s? That's interesting.", buf);
    fflush(stdout);
    for(i; i != 2; i++){
        puts("please put in your birthday and time in the format (month/day/year/time) and we will have your very own horoscope\n");
        fflush(stdout);
        getInfo();
        puts("want to try again?\n");
        fflush(stdout);
    }
    puts("too bad, we don't have the resources for that right now >:(");
    fflush(stdout);
}

void getInfo(){
  char info [100];

  memset(info,0,100);
  read(0,info,140);
  puts(info);
  puts("hm, I'll have to think about what this means. I'll get back to you in 5 business days.");
  fflush(stdout);
}

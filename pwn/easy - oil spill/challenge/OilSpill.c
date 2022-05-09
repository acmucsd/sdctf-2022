#include <stdio.h>
#include <string.h>


int temp(){
	puts("what's going on here?");
}

char x[] = "Interesting Proposition";

int main(int argc, char ** argv){
	char buf[300];
	printf("%p, %p, %p, %p\n", puts, printf, buf, temp);
	puts("Oh no! We spilled oil everywhere and its making everything dirty");
	puts("do you have any ideas of what we can use to clean it?");
        fflush(stdout);
	fgets(buf, 300, stdin);
	printf(buf);
	puts(x);
        fflush(stdout);
}


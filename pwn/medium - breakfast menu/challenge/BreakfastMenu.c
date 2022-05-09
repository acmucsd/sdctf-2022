#include <stdio.h>
#include <string.h>
#include <stdlib.h>

char *orders[15];
char buf[0x40];

int main(int argc, char ** argv){
    puts("Welcome to the SDCTF cafe!\n");
    puts("This restaurant works a little different than normal ones. First, tell us if you want to make a new order, then you can change or delete orders.\n");
    fflush(stdout);
    int size = 0;
    while(1){
        puts("1. Create a new order\n2. Edit an order\n3. Delete an order\n4. Pay your bill and leave");
        fflush(stdout);
        int choice;
        memset(buf, 0, 0x40);
        scanf("%d", &choice);
        getchar();
        switch(choice){
            case 1:
                if(size > 15){
                    puts("Too many orders, you can't be making any more!!!");
                    fflush(stdout);
                    break;
                }
                orders[size] = malloc(40);
                size++;
                puts("A new order has been created");
                fflush(stdout);
                break;
            case 2:
                puts("which order would you like to modify");
                fflush(stdout);
                scanf("%d", &choice);
                getchar();
                if(!(choice < size)){
                    puts("Order doesn't exist!!!");
                    fflush(stdout);
                    break;
                }
                puts("We have eggs, cereal, waffles and french toast. \nWhat would you like to order?");
                fflush(stdout);
                if (fgets(buf, 0x40, stdin))
                    {
                        printf("so you wanted %s", buf);
                        fflush(stdout);
                    }
                strcpy(orders[choice], buf);
                break;
            case 3:
                puts("which order would you like to remove");
                fflush(stdout);
                scanf("%d", &choice);
                getchar();
                if(!(choice < size)){
                    puts("Order doesn't exist!!!");
                    fflush(stdout);
                    break;
                }
                free(orders[choice]);
                break;
            case 4:
                puts("thanks for coming!");
                fflush(stdout);
                exit(0);
                break;
            default:
                exit(0);
                break;
        }
    }

}

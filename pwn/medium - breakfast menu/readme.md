# Breakfast Menu
## PWN - Medium
| author | first blood                    | solves | points |
| --- |--------------------------------| -- | --- |
| green beans | fredd from **thehackerscrew** | 32 | 250 |
### prompt
I’m awfully hungry, with all these options to choose from, what should I order?

`nc breakfast.sdc.tf 1337`

### original specification
Breakfast menu with alloc, free, edit. double free in 2.27. no real bounds check on heap so fake chunk is easy, then call double free to leak libc and overwrite free_hook

**flag:** `sdctf{Th3_m05t_1Mp0Rt4nT_m34L_0f_th3_d4Y}`

### write-ups
1. https://4n0nym4u5.netlify.app/post/san-diego-ctf-2022/
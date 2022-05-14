# Horoscope
## PWN - Easy
| author      | first blood                  | solves | points |
|-------------|------------------------------| -- | --- |
| green beans | Linz from **thehackerscrew** | 125 | 100 |
### prompt
This program will predict your future!

`nc horoscope.sdc.tf 1337`

### original specification
Basic ret value exploit with buffer overflow using read. Only NX enabled, gotta chain multiple functions, one where it switches a global boolean, another that pops a shell if the boolean is switched. 

**flag:** `sdctf{S33ms_y0ur_h0rO5c0p3_W4s_g00d_1oD4y}`

### writeups
1. https://shakuganz.com/2022/05/09/san-diego-ctf-3-2022-write-up-pwn/
2. https://kenanb.notion.site/Horoscope-7c89206eafa84e1a83f3fac3b1ec9dd3
3. https://4n0nym4u5.netlify.app/post/san-diego-ctf-2022/
4. https://github.com/tj-oconnor/ctf-writeups/tree/main/sdctf/horoscope
5. https://github.com/thewhitecircle/ctf_writeups/blob/main/sdctf_2022/pwn.md#horoscope
6. https://mikecat.github.io/ctf-writeups/2022/20220507_San_Diego_CTF_2022/PWN/Horoscope/
7. https://chovid99.github.io/posts/sandiego-ctf-2022/#horoscope
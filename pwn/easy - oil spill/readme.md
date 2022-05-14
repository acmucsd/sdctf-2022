# Oil Spill
## PWN - Easy
| author | first blood                  | solves | points |
| --- |------------------------------| -- | --- |
| green beans | Linz from **thehackerscrew** | 73 | 200 |
### prompt
Darn, these oil spills are going crazy nowadays. It looks like there's a little bit more than oil coming out of this program though...

`nc oil.sdc.tf 1337`

### original specification
Given a way to leak the address of a known libc function, we can compute the address of system and replace the Global Offset table entry for a future lib function call (puts). Then, we only need to ensure the stack contains our payload /bin/sh...

https://blog.pwntools.com/posts/got-overwrite/

**flag:** `sdctf{th4nks_f0r_S4V1nG_tH3_duCk5}`

### write-ups
1. https://4n0nym4u5.netlify.app/post/san-diego-ctf-2022/
2. https://github.com/tj-oconnor/ctf-writeups/tree/main/sdctf/oilspill
3. https://mikecat.github.io/ctf-writeups/2022/20220507_San_Diego_CTF_2022/PWN/Oil_Spill/
4. https://chovid99.github.io/posts/sandiego-ctf-2022/#oil-spill
# Oil Spill
## PWN - Easy
| author | first blood | solves | points |
| --- | --- | --- | --- |
| green beans | Linz (thehackerscrew) | 0 | 0 |
### prompt
Darn, these oil spills are going crazy nowadays. It looks like there's a little bit more than oil coming out of this program though...

`nc oil.sdc.tf 1337`

### original specification
Given a way to leak the address of a known libc function, we can compute the address of system and replace the Global Offset table entry for a future lib function call (puts). Then, we only need to ensure the stack contains our payload /bin/sh...

https://blog.pwntools.com/posts/got-overwrite/

**flag:** `sdctf{th4nks_f0r_S4V1nG_tH3_duCk5}`


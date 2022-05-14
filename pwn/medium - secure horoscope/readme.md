# Secure Horoscope
## PWN - Medium
| author | first blood | solves | points |
| --- | -- | --- | --- |
| green beans | **mito** | 53 | 250 |
### prompt
Our horoscope developers have pivoted to a more security-focused approach to predicting the future. You won’t find breaking into this one quite so easy!

`nc sechoroscope.sdc.tf 1337`

### original specification
Create a fake stack in memory and jump to it using a small amount of overflowed space.

https://ir0nstone.gitbook.io/notes/types/stack/stack-pivoting

**flag:** `sdctf{Th0s3_d4rN_P15C3s_g0t_m3}`

### write-ups
1. https://shakuganz.com/2022/05/09/san-diego-ctf-3-2022-write-up-pwn/
2. https://4n0nym4u5.netlify.app/post/san-diego-ctf-2022/
3. https://github.com/tj-oconnor/ctf-writeups/tree/main/sdctf/securehoroscope
4. https://chovid99.github.io/posts/sandiego-ctf-2022/#secure-horoscope
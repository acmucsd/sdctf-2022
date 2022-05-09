# Secure Horoscope
## PWN - Medium
| author | first blood | solves | points |
| --- | --- | --- | --- |
| green beans | _ | 0 | 0 |
### prompt
Our horoscope developers have pivoted to a more security-focused approach to predicting the future. You won’t find breaking into this one quite so easy!

`nc sechoroscope.sdc.tf 1337`

### original specification
Create a fake stack in memory and jump to it using a small amount of overflowed space.

https://ir0nstone.gitbook.io/notes/types/stack/stack-pivoting

**flag:** `sdctf{Th0s3_d4rN_P15C3s_g0t_m3}`


# Horoscope
## PWN - Easy
| author      | first blood | solves | points |
|-------------| --- | --- | --- |
| green beans | Linz (thehackerscrew) | 0 | 0 |
### prompt
This program will predict your future!

`nc horoscope.sdc.tf 1337`

### original specification
Basic ret value exploit with buffer overflow using read. Only NX enabled, gotta chain multiple functions, one where it switches a global boolean, another that pops a shell if the boolean is switched. 

**flag:** `sdctf{S33ms_y0ur_h0rO5c0p3_W4s_g00d_1oD4y}`


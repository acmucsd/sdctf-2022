# magic^3
## REVENGE - Hard
| author | first blood | solves | points |
| --- | --- | --- | --- |
| k3v1n | _ | 0 | 0 |
### prompt
Any technology that is advanced enough is indistinguishable from magic. This binary does it next level: it is magic raised to the third power.

**Connect via**:
`nc magic3.sdc.tf 1337 `

### original specification
A x86-64 binary that asks for a password, then transforms the part of the password inside sdctf{} into a series of moves F, B, U, D, L, R (probably encoded by some binary encoding/obfuscation instead of plain ASCII FBUDLR characters, or maybe LDRBUF to make it look like assembly code lol: ldr buf ). Those moves internally permute 6*9 = 54  different numbers. The trick is that those numbers are a numbering of the Rubik's cube tiles and the moves represent permutations that move the cube. Giving any password that solves the rubik's cube in around 30 steps (this gives a length limit on the password) prints the flag.

There are many algorithms for solving a rubik's cube in very few steps and there are online websites that does that. The hard part is figuring out the binary is even permuting a rubik's cube in the first place.

The title is a small hint: The Rubik's cube was originally called the "Magic Cube" ^3 means cubed.

**flag:** `sdctf{U2_m4st3rED_thE_DarK_MAg1c_0f_cub1ng}`
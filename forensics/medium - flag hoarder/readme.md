# Flag Hoarder
## FORENSICS - Medium
| author | first blood | solves | points |
| --- | -- | --- | --- |
| Aaron James | hfz from **Project Sekai** | 16 | 250 |
### prompt
We were able to recover a flag from the PC of a notorious flag hoarder. Unfortunately, they've encrypted the flag so no one can have it!

They also deleted the original encryption program, so all we have to go off of is this mysterious file we found in the same directory...

### original specification
The player is provided with a core dump of a simple C program and a file that contains an encrypted flag. All the program does is encrypt files by using the provided password as an (xor) one-time-pad against the file in question. Therefore, the core dump contains, in memory, the password file that the player will need to xor the encrypted flag file with.

Will require the player to not only reverse a very simple C program (that will probably be quickly decompiled by Ghidra), but also grab the password from memory and use it to decode the encrypted flag.

**flag:** `sdctf{Th1S_1s_My_3ncRYPt3d_FlaG}`


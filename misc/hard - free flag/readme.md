# Free Flag
## MISC - Hard
| author | first blood | solves | points |
| --- | --- | --- | --- |
| Kevin He, Aaron James | _ | 0 | 0 |
### prompt
We are so generous that we literally decided to give you a free flag on a challenge other than sanity check.

### original specification
`flag.png` is an image of a checkerboard flag (that's why it is literally a flag), with steganography hiding the actual textual flag. But a careful participant will notice that on the bottom right corner of the flag, there is a transparent watermark saying

**Made via "The Ultimate Flag Hider"**. Try it at https://flag.sdc.tf

Make a web application at `flag.sdc.tf` that allows you to experiment and apply LSB steganography on an uploaded image by embedding a textual flag of one's choice. The stego MUST be done in server code (Node.js preferred) to hide the source code from participants. After hiding the flag with steganography the participant can download the steganographic file.

The encryption works as follows:
First convert the flag into binary string (0101010...). Then for every octet (8-bit byte), apply a substitution cipher on it (randomized permutation table) and change the bits accordingly. For every color component (R, G, or B) of every pixel (in the order of left to right from top to bottom), change the 2 least significant bits of the color component value to be the next 2 bits of the substituted flag bit stream. 

**flag:** `sdctf{St3g0nOgrAPHY_AnD_Cl0s3d_SRC_Are_A_FUN_C0mb0}`

### write-ups
1. https://mikecat.github.io/ctf-writeups/2022/20220507_San_Diego_CTF_2022/MISC/Free_Flag/
2. https://ctftime.org/writeup/33726
3. https://github.com/danieltaylor/sdctf22-writeups/tree/main/free-flag
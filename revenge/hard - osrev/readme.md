# OSREV
## REVENGE - Hard
| author | first blood | solves | points |
| --- | --- | --- | --- |
| k3v1n | _ | 0 | 0 |
### prompt
Finally, you encountered a hard reversing challenge that is 100% Open Source (OSREV). There is not even a binary for you to reverse.

However, the number of licensed copies is limited. We need to ship our top secret build key along with each copy. Plus recipients have to sign a non disclosure agreement before they can access the build key. The fewer people we give it to, the more secure the program is!

It looks like you have an unlicensed copy (no build key). Yikes!

### original specification
An obfuscated Makefile that takes in a “build key” and does some checks, only a valid build key will pass. Then the SHA256 hash of the build key is passed to gcc which use that to build a C program which then XOR’s the build key with the encrypted flag and then simply print the flag.

**flag:** `sdctf{EuCl1d3an_4Lg0riThM_IS_v3Ry_F4sT}`


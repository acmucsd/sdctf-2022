# Vinegar
## CRYPTO - Easy
| author             | first blood | solves | points |
|--------------------| -- | --- | --- |
| k3v1n, Aaron James | Danisaur from **BYU Cyberia** | 193 | 100 |
### prompt
My friend gave me another encrypted flag...I think they hate me!
I heard them yell something about “Vinegar”, but I still don’t know what they’re talking about!

Ciphertext: `{wbeyrjgewcfroggpesremvxgvefyrcmnnymxhdacgnnrwprhxpuyyaupbmskjrxfopr}`

**Note**: My friend also yelled something about “preventing plaintext attacks” and said once I’ve decrypted this, I’ll need to append sdctf to the front of it.

### original specification
Encrypt a long text containing the flag (with sdctf removed and only _ and { remaining) with a key the participant don't know. 

Ex. plaintext can be
{noleetstringsbecausevigenereistextonly}

Make sure it is solvable with https://www.guballa.de/vigenere-solver

**flag:** `sdctf{couldntuseleetstringsinthisonesadlybutwemadeitextralongtocompensate}`

### write-ups
1. https://github.com/thewhitecircle/ctf_writeups/blob/main/sdctf_2022/crypto.md
2. https://gitlab.com/newyork167/ctf/-/tree/main/2022/SDCTF/Crypto/Vinegar
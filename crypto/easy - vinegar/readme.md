# Vinegar
## CRYPTO - Easy
| author             | first blood | solves | points |
|--------------------| --- | --- | --- |
| k3v1n, Aaron James | _ | 0 | 0 |
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


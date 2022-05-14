# Six Bites
## CRYPTO - Easy
| author | first blood | solves | points |
| --- | -- | --- | --- |
| Aaron James | deuterium from **Project Sekai** | 56 | 120 |
### prompt
My friend sent me the flag, but its encrypted!
I heard them yell something about six bites...but I don’t understand what they mean!

The ciphertext: `kwsbqhS}_aYLH_!WYg+kDIV0yp[k`

Can you decrypt the flag?

### original specification
By using the knowledge that the key size is six bytes, players will hopefully conclude they will have to perform a XOR known-plaintext attack, with their knowledge of the first six characters of the flag sdctf{. They can use CyberChef to discover what key produces sdctf{, then copy those bytes back in as the key to decrypt the entire flag.

**flag:** `sdctf{KnOwN_PL1ANt3xT_A#acK}`

### write-ups

1. https://github.com/EanDudley30/CTF-Writeups/blob/647a79a9a6a2501bde19d742083b5780c0ecb1f4/SDCTF%202022/Six-Bites.md
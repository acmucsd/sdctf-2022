# Tasty Crypto Roll
## CRYPTO - Hard
| author | first blood | solves | points |
|--------| --- | --- | --- |
| k3v1n  | _ | 0 | 0 |
### prompt
Bob, the genius intern at our company, invented AES-improved. It is based on AES but with layers after layers of proprietary encryption techniques on top of it.

The end result is an encryption scheme that achieves both confusion and diffusion. The more layers of crypto you add, the better the security, right?

### original specification
There are many layers of encoding/encryption involved starting at the plaintext, listed as follows:

KEY1 = process ID -> os.getpid()

KEY2 = random 16 bytes (AES128) TODO: assumed

FLAG_INNER is going to be what is encrypted

WARNING: should start and end with some garbage Ex. base64 text, still make sure no duplicates
with middle being l33t_str1ng

FLAG_INNER = ... where ... never contain duplicate characters

FLAG = sdctf{FLAG_INNER}

1. First permute some 2-byte UTF8 characters randomly using KEY1, each character occurring exactly twice and assign them to each
2. Map each character from FLAG_INNER to ~8 UTF8 two byte characters
3. Convert the thing to binary (x8 in string length)

Then AES 128 using ECB mode using KEY2, the resulting form is vulnerable to frequency analysis with repeated blocks
random.seed(KEY1)

FINAL_PERMUTATION = random.(permutation)

KEY_FINAL = random.(get 16 bytes key)

Then permute the bits according to FINAL_PERMUTATION

Then AES 128 again using KEY_FINAL

## Cryptanalysis

Note: can try all KEY1 from 1 to some large value to brute force.

Find the KEY1 number that gives duplicated ECB blocks. Then exploit the fact that the same plaintext block encrypts to the same ciphertext block, try to figure out the plaintext based on the pattern.

The S-boxes has some characters like W encrypting to some easily identifiable pattern. Once those characters are encrypted, one can figure out the “identity” of some blocks and subsequently decrypt

**flag:** `sdctf{r0l1-uR~pWn.c6yPtO_wi7h,ECB:I5*b8d!KQvJmLxgX9DsaANMFSeU}`


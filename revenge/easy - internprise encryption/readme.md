# Internprise Encryption
## REVENGE - Easy
| author | first blood | solves | points |
| --- | --- | --- | --- |
| Nick Petrone | _ | 0 | 0 |
### prompt
Our new intern Dave encrypted all of our important company files with his homemade "military grade encryption scheme" to try and improve company security. The thing is... he didn’t make the “decryption” part and we didn’t make backups.

### original specification
Programmatic encryption of flag that uses bitwise operators, muliplication, addition, and subtraction to determine the output bytes. You are given a zip archive with encrypted text files, and one of them (flag.txt) will contain the encrypted flag. Reverse engineering the encryption scheme (mainly by undoing the operations done line by line from bottom up and reversing the stream cipher will transform the output of flag.txt into the original text, yielding the flag.

**flag:** `sdctf{D0n't_b3_a_D4v3_ju5t_Use_AES_0r_S0me7h1ng}`


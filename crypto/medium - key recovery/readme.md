# Key Recovery
## CRYPTO - Medium
| author | first blood | solves | points |
|--------| --- | --- | --- |
| k3v1n  | _ | 0 | 0 |
### prompt
Oh no, I can't log into my SSH server anymore. My RSA private key is corrupted by ransomware and I need your help recovering it.

Please submit the flag as sdctf{<sha256_hash>}, where <sha256_hash> is the SHA-256 hash of the original SSH private key file as 64 lowercase hex digits.

As an unrealistic hypothetical example, if the original SSH private key is the 0 byte empty file, the flag would be `sdctf{e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855}`

**Note on flag submission**

Make sure the recovered key has the exact same format as id_rsa.corrupted. That is, same number of lines (including the trailing newline), same line terminator (LF), and same encoding (ASCII). The SHA256 hash is sensitive to every detail.

### original specification
Include the first few bytes up to n, e, and d (for the OpenSSH private key format see https://coolaj86.com/articles/the-openssh-private-key-format/). It is possible to recover p, q, and q^-1 mod p (called iqmp) from n,e, and d. See https://stackoverflow.com/a/2922113. 

The difficult part then is figuring out what the erased segment that is not p or q means.

First people search up the source code of portable OpenSSH here: https://github.com/openssh/openssh-portable/blob/69928b106d8f0fa15b88cf3850d992ed81c44ae0/sshkey.c#L3253

You will find p, q, and iqmp.

If you search up iqmp online, there is an OpenSSL man page that happens to use the same nomenclature as the portable OpenSSH source code referring to the segment as iqmp.

Finally, Wikipedia noted an optimization of RSA based on Chinese Remainder Theorem. One of the parameters is “disguised” as iqmp, standing for the (multiplicative) inverse of q mod p.

Make sure the version number is 0 and test to make sure the SSH key works.

**flag:** `sdctf{687a497b47a7e8e6e88cafc6181fa0b3676548b989e7bff9bc87d55d450abd51}`

### write-ups
1. https://mikecat.github.io/ctf-writeups/2022/20220507_San_Diego_CTF_2022/CRYPTO/Key_Recovery/
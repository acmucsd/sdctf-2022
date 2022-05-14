# Rbash — Yet Another Calculator
## JAIL - Medium
| author | first blood | solves | points |
| --- | --- | --- | --- |
| k3v1n | fredd (thehackerscrew) | 0 | 0 |
### prompt
Rbash, in its most restricted form, is nothing but a calculator.
To get started, try this command :)

`echo $(( 1337 + 1337 ))`

**Disclaimer**: The flag does not have an easy guessable filename, but it is located in the initial working directory of the rbash instance.

**Connect via**: `socat FILE:'tty',raw,echo=0 TCP:yac.sdc.tf:1337`

### original specification
No components on PATH

Exploit by listing contents of the current directory via
- `echo *`
- and reading the flag using `echo "$(< flagname.txt)"`

**flag:** `sdctf{red1r3ct1ng_std1n_IS_p3rm1tt3d_1n_rb45h!}`

### write-ups
1. https://github.com/thewhitecircle/ctf_writeups/blob/main/sdctf_2022/jail.md#rbash-yet-another-calculator
2. https://mikecat.github.io/ctf-writeups/2022/20220507_San_Diego_CTF_2022/JAIL/Rbash_Yet_Another_Calculator/
3. https://github.com/ninnikukawaii/write-ups/tree/master/San%20Diego%20CTF%202022/jail/rbash-yet-another-calculator
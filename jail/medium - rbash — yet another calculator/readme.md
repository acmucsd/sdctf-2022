# Rbash — Yet Another Calculator
## JAIL - Medium
| author | first blood | solves | points |
| --- | --- | --- | --- |
| k3v1n | _ | 0 | 0 |
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


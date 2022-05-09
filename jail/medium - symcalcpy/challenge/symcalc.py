#! /usr/bin/env python3
import string, sys
from code import InteractiveConsole

sys.stderr = sys.stdout

# The most restrictive (=secure) calculator ever! Only operators and digits are allowed!
ALLOWED_CHARS = set(string.punctuation + string.digits + '\n')

ace = True

def pyjail_filter_code(source: str) -> bool:
    if ace:
        return True
    for char in source:
        if char not in ALLOWED_CHARS:
            return False
    return True

class SymCalc(InteractiveConsole):
    def runsource(self, source: str, filename: str="<input>", symbol: str="single") -> bool:
        if not pyjail_filter_code(source):
            print('[!] The source is not a valid calculator expression')
            return False
        return super().runsource(source, filename=filename, symbol=symbol)

BANNER = """
Welcome to SymCalc, the SYMbol-only CALCulator.
SymCalc combines a Python-like prompt interface with advanced formula support.
You are only allowed to type ASCII punctuations and digits.
Even whitespace is disallowed.
Basic example:
>>> 1+1
2

Order of operations is preserved, but you can use parenthesis anywhere
>>> 3*(5+5)+7
37

You can even use line breaks thanks to our Python syntax support:
>>> 1+1+\\
... 1+1
4

First answer a question:
""".strip()

print(BANNER)

sc = SymCalc()

fav_builtin = input('What is your favorite word? ')
if not (fav_builtin.isascii() and fav_builtin.isalpha() and fav_builtin.islower()):
    print(f"[!] {fav_builtin} ain't a word!")
    sys.exit(1)
sc.push(fav_builtin)
ace = False
print("Happy calculating! And don't even try to hack!")
sc.interact(banner="")

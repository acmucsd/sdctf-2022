#! /usr/bin/env python3
from sage.all import *
import magic_common


C = CubeGroup()
POSSIBLE_MOVES = 'FBLRUD'

# Case generator
cases = ""

for mv in POSSIBLE_MOVES:
    cases += f"case {mv}:\n"
    cycles = C.parse(mv) 
    cases += magic_common.gen_cycle_magic('\t', cycles)
    cases += "\tbreak;\n\n"

print(cases.replace('\t', '    '))

from sage.all import *

def gen_cycle_magic(prefix, cycles):
    magics = ''
    for cycle in cycles.cycle_tuples():
        magics += f"{prefix}magic1({{{', '.join([str(i) for i in cycle])}}});\n"
    return magics

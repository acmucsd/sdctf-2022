#! /usr/bin/env python3
import re

BEFORE = 'unobfuscated.mak'
AFTER = 'Makefile'

IDENTIFIER_PAT = re.compile(r'(^[a-zA-Z0-9_]+)\s*:?=', re.MULTILINE)

REPLACEMENTS = [
    (r'#.*', ''), # Remove comments
    (r'\n+', '\n'), # Replace multiple newlines with single newlines
    (r'\$\\\s*', ''), # Crunch everything into one line (no readability-enhancing line splits)
]

def should_obfuscate_name(name: str):
    return all(not c.isupper() for c in name) or 'N1' in name or 'N2' in name

def transform(ipt: str):
    for before, after in REPLACEMENTS:
        ipt = re.sub(before, after, ipt)
    var_ctr = 0
    for identifier in re.findall(IDENTIFIER_PAT, ipt):
        # print(identifier)
        # print(should_obfuscate_name(identifier))
        if should_obfuscate_name(identifier):
            var_name = f'var_{var_ctr}'
            var_ctr += 1
            print(f'{identifier} => {var_name}')
            ipt = re.sub(r'\b' + identifier + r'\b', var_name, ipt)
    return ipt

with open(BEFORE) as bf, open(AFTER, 'w') as af:
    af.write(transform(bf.read()))

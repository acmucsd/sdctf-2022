#! /usr/bin/env python3
# Finds the shortest flip code

from typing import List
from string import ascii_uppercase


def str2bin(s: str):
    b = s.encode()
    return ''.join('{:08b}'.format(c) for c in b)

def compute(start: str, end: str):
    flips: List[int] = []
    assert len(start) == len(end)
    sbits = str2bin(start)
    ebits = str2bin(end)
    for i, (sb, eb) in enumerate(zip(sbits, ebits)):
        if sb != eb:
            flips.append(i)
    print(f'Flip parity: {"odd" if len(flips) % 2 else "even"}')
    return ''.join(ascii_uppercase[flip // 26] + ascii_uppercase[flip % 26] for flip in flips)

print(compute("rm -rf /trash/", "rm -rf ///////"))
print(compute("Send Mallory 1000 USD", "Send Mallory 9999 BTC"))
# Flip parity: even
# CNCPCQCSCTCVCXCYCZDBDDDGDHDIDLDNDODPDTDXDYDZ
# Flip parity: odd
# EEEMEPEUEXFCFFFRFTFUFVGBGCGDGJGKGL

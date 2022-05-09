#! /usr/bin/env python3
# Generate two semi-primes sharing a common factor

import hashlib
from typing import List
from Crypto.Util import number
import math

# Flag: sdctf{EuCl1d3an_4Lg0riThM_IS_v3Ry_F4sT}
FLAG_INNER = b'EuCl1d3an_4Lg0riThM_IS_v3Ry_F4sT'

assert len(FLAG_INNER) == 32

PRIME_LENGTH = 415

# BASE = 20
# CHARSET = '0123456789abcdefghij'
BASE = 13
CHARSET = '0123456789abc'

assert len(CHARSET) == BASE

def number_to_base(n: int) -> str:
    if n == 0:
        return CHARSET[0]
    digits: List[str] = []
    while n:
        digits.append(CHARSET[n % BASE])
        n //= BASE
    return ''.join(digits[::-1])

def xor(a: bytes, b: bytes):
    return bytes([ac ^ bc for ac, bc in zip(a, b)])

if __name__ == "__main__":
    # p = number.getPrime(PRIME_LENGTH)
    # q = number.getPrime(PRIME_LENGTH)
    # r = number.getPrime(PRIME_LENGTH)
    assert PRIME_LENGTH == 415
    p = 75227885929032110791018711128243266584385627444280311943455726685686033905453101750169739498931286941204581870200680196536383
    q = 65265598259026295833211390171336940245489995801245144401787719610752471696878271097996213462599511042569754943651233513341047
    r = 69699036060752372024983481025501605504743153787776864732864015266124217809367610014395192686961126058039506972218555037959059

    n1 = p * q
    n2 = p * r

    print('N1 :=', number_to_base(n1))
    print('N2 :=', number_to_base(n2))
    assert p == math.gcd(n1, n2)
    key = number_to_base(p)
    print('DEBUG: KEY :=', key)
    print(f'DEBUG: decimal equivalents: n1={n1} n2={n2} p={p}')

    print(f'DEBUG HEX = {hashlib.sha256(key.encode()).hexdigest()}')

    key_digest = hashlib.sha256(key.encode()).digest()
    encrypted_flag = xor(FLAG_INNER, key_digest)

    print('char enc[] = {', end='')
    for c in encrypted_flag:
        print(hex(c), end=',')
    print('0x00};')

    # Sample base 10:
    # N1 := 2388785611
    # N2 := 2195236073
    # DEBUG: p= 36671
    
    # Sample base 13:
    # N1 := 2c0b90414
    # N2 := 28ca54174
    # DEBUG: p= 138cb
    # expected SHA256 = bf5ab3bf8b81c64f9d9380bf71d524f53e460630fd2f248ad469f85f72104304

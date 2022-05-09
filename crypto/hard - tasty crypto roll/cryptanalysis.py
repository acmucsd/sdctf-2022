import random
import sys
from time import time
from typing import Dict, List, Optional, Sequence, TypeVar
from Crypto.Cipher import AES

# AES-128
BLOCK_SIZE_BYTES = 16
# Find duplicate blocks ONLY in this range (not outside)
NBLOCKS = 5

def to_binary(b: bytes) -> str:
    return ''.join(['{:08b}'.format(c) for c in b])

def from_binary(s: str) -> bytes:
    return bytes(int(s[i:i+8], 2) for i in range(0, len(s), 8))

def decrypt(key: bytes, message: bytes):
    cipher = AES.new(key, AES.MODE_ECB)
    return cipher.decrypt(message)

# Do the reverse of random.shuffle
T = TypeVar('T')
def reverse_shuffle(l: List[T]) -> List[T]:
    identity = list(range(len(l)))
    random.shuffle(identity)
    old_l: List[T] = [None] * len(l) # type: ignore
    for i, ele in enumerate(l):
        old_l[identity[i]] = ele
    return old_l

def blocks(b: bytes):
    for i in range(0, len(b), BLOCK_SIZE_BYTES):
        yield b[i:i+BLOCK_SIZE_BYTES]

def has_duplicate_blocks(b: bytes):
    blks = list(blocks(b))
    return len(blks) != len(set(blks))

# Pattern identification
def num2char(n: int):
    return chr(ord('A') + n)

def get_pattern(s: Sequence[object]) -> str:
    ls: List[str] = []
    n = 0
    known: Dict[object, str] = dict()
    for c in s:
        if c not in known:
            known[c] = num2char(n)
            n += 1
        ls.append(known[c])
    return ''.join(ls)

with open('enc.bin', 'rb') as encf:
    ciphertext = encf.read()

MAX_PID = 32768

start = time()

for key1 in range(1, MAX_PID + 1):
    random.seed(key1)
    key_final = bytes(random.randrange(256) for _ in range(16))
    data = decrypt(key_final, ciphertext)
    data = from_binary(''.join(reverse_shuffle(list(to_binary(data)))))
    if has_duplicate_blocks(data):
        print(f'Found key1 = {key1}')
        end = time()
        print(f'Used {end - start} seconds')
        blks = list(blocks(data))
        break
else:
    assert False

print('[B] ', data.hex()) #debug

ENCODING = 'utf-8'
codes = list(''.join(chr(i) * 2 for i in range(0xb0, 0x1b0)))
random.seed(key1)
random.shuffle(codes)
sboxes = [''.join(codes[i*4:(i+1)*4]) for i in range(128)]
# data = ''.join(sboxes[c] for c in data).encode(ENCODING)

all_codes = ''.join(sboxes)

pat_to_char: Dict[str, Optional[str]] = {}
print('Clues:')
for i, mc in enumerate(sboxes):
    if len(set(mc)) < len(mc): # Duplicate character in S-box
        pat = get_pattern(mc)
        c = chr(i)
        print(repr(c), mc, pat)
        if pat not in pat_to_char:
            pat_to_char[pat] = c
        else:
            print('The above character is ambiguous...')
            pat_to_char[pat] = None # Ignore ambiguous chars for this version, more advance cryptanalysis can try both

print('Pattern mapping:')
print(pat_to_char)


assert len(blks) % 4 == 0
SENTINEL = '¿'
chars = [SENTINEL] * (len(blks) // 4)

# Identify a block with a symbol
# NOTE: this function ASSUMES a symbol will not be repeated in the plaintext (might lead to wrong detection in that case)
# It is the case for the flag to prevent frequency analysis
# In any case, repeated symbol is easily detectable bby inspecting and finding all block to be equal
def identify(blk: bytes, symbol: str):
    print(f'identify {blk.hex()} with {hex(ord(symbol))}')
    for i in range(len(blks)):
        loc = i // 4
        if chars[loc] != SENTINEL:
            continue
        if blks[i] == blk:
            boxloc1 = all_codes.find(symbol)
            assert boxloc1 != -1
            boxloc2 = all_codes.find(symbol, boxloc1 + 1)
            assert boxloc2 != -1
            for boxloc in [boxloc1, boxloc2]:
                ci = boxloc // 4
                # coffset = boxloc % 4
                if chr(ci) in chars:
                    # print('badness')
                    continue
                assert chars[loc] == SENTINEL
                assign(loc, chr(ci))
            # else:
            #     assert False, (i, loc, boxloc1, boxloc2, hex(ord(symbol)))
        # assign(loc, )

def assign(loc: int, c: str):
    if chars[loc] != SENTINEL:
        assert chars[loc] == c
        return
    chars[loc] = c
    print(f'chars[{loc}] = {c}')
    for i in range(4):
        identify(blks[loc * 4 + i], sboxes[ord(c)][i])

for i in range(0, len(blks), 4):
    subblks = blks[i:i+4]
    pat = get_pattern(subblks)
    if pat in pat_to_char:
        c = pat_to_char[pat]
        if c != None:
            assign(i // 4, c)

plain = ''.join(chars)
if SENTINEL in plain:
    print('WARNING: unable to decrypt all characters')
print('Flag:', 'sdctf{' + ''.join(chars) + '}')


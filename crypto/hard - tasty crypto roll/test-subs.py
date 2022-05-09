import itertools
import random
from typing import Dict, List, Tuple

BYTE_VARIETY = 128
BLOCK_SIZE = 4
CHARSET_LENGTH = BLOCK_SIZE * BYTE_VARIETY // 2
# CHARSET_LENGTH = 3

# Start of 2-byte UTF-8
# TWOBYTE_START = 0x80
TWOBYTE_START = 0xB0

assert TWOBYTE_START + CHARSET_LENGTH <= 0x800

codes = list(''.join(chr(i) * 2 for i in range(TWOBYTE_START, TWOBYTE_START + CHARSET_LENGTH)))

# random.seed(0x1337)
# random.seed(0x1338)
# random.seed(0x1340)
random.seed(83)
random.shuffle(codes)
assert len(codes) == BLOCK_SIZE * BYTE_VARIETY
charmap = [''.join(codes[i*BLOCK_SIZE:(i+1)*BLOCK_SIZE]) for i in range(BYTE_VARIETY)]
# assert ''.join(charmap) == ''.join(codes)

# print(charmap)

def dispstring(s: str):
    return ' '.join('0x{:03x}'.format(ord(c)) for c in s) + '\n'
    # for c in s:
    #     print('0x{:03x}'.format(ord(c)), end=' ')
    # print()

with open('subs.txt', 'w') as sf:
    for i, s in enumerate(charmap):
        print(f'{repr(chr(i))}: {str(i).rjust(3)}: {dispstring(s)}', end='', file=sf)

for i, mc in enumerate(charmap):
    if len(set(mc)) < len(mc):
        print(i)

# codes = b''.join(bytes([i]) * 2 for i in range(256))
# print(codes)
# print(codes.encode('utf-8'))

# print(repr(codes))

allchars = ''.join(charmap)
tbl: Dict[Tuple[int, int], List[int]] = dict()
for i, j in itertools.product(range(BLOCK_SIZE), repeat=2):
    tbl[tuple(sorted((i,j)))] = []
for ci in range(TWOBYTE_START, TWOBYTE_START + CHARSET_LENGTH):
    c = chr(ci)
    fst_occr = allchars.find(c)
    snd_occr = allchars.find(c, fst_occr+1)
    i = fst_occr % BLOCK_SIZE
    j = snd_occr % BLOCK_SIZE
    tbl[tuple(sorted((i,j)))].append(ci)

for key, value in sorted(tbl.items()):
    print(f'{key}: {[hex(v) for v in value]}')

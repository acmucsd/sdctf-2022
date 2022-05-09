# PRIVATE/ADMIN file!!!
# DO NOT share to participants

import base64, string, random
from typing import Dict

FLAG = 'sdctf{OBscurity_Is_SeCur1ty!}'
SEED = 0x1337face

B64_ALPHABET = string.ascii_uppercase + string.ascii_lowercase + string.digits + '+/'
# print(B64_ALPHABET)
assert len(B64_ALPHABET) == 64
PAD_CHAR = '='

letter2index: Dict[str, int] = dict()

for i, letter in enumerate(B64_ALPHABET):
    letter2index[letter] = i

random.seed(SEED)

shift = random.randint(1, 63)
print('Shift: {}'.format(shift))

s_b64 = base64.b64encode(FLAG.encode()).decode()
# print(s_b64)

def char_shift(c: str):
    if c == PAD_CHAR:
        return PAD_CHAR
    i = letter2index[c]
    return B64_ALPHABET[(i+shift) % 64]

print(''.join(map(char_shift, s_b64)))

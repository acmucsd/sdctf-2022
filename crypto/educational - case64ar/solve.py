# Solve script

# PRIVATE/ADMIN file!!!
# DO NOT share to participants

import base64, string
from typing import Dict

CIPHERTEXT = 'OoDVP4LtFm7lKpHkMJDrJmXlJn/XCpHk+JDr6Jm='
SEED = 0x1337face

B64_ALPHABET = string.ascii_uppercase + string.ascii_lowercase + string.digits + '+/'
assert len(B64_ALPHABET) == 64
PAD_CHAR = '='

letter2index: Dict[str, int] = dict()

for i, letter in enumerate(B64_ALPHABET):
    letter2index[letter] = i

def char_shift(c: str, shift: int):
    if c == PAD_CHAR:
        return PAD_CHAR
    i = letter2index[c]
    return B64_ALPHABET[(i+shift) % 64]

def shift_all(ciphertext: str, shift: int):
    return ''.join(map(lambda c: char_shift(c, shift), ciphertext))

for shift in range(64):
    bys = base64.b64decode(shift_all(CIPHERTEXT, shift))
    try:
        s = bys.decode()
    except UnicodeDecodeError:
        pass # This shift number must be invalid since flags can only contain plaintext
    else:
        print('Encryption shift count: {}'.format(64 - shift))
        print(s)

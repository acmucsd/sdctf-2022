import os
import random
import secrets
import sys
from Crypto.Cipher import AES

ENCODING = 'utf-8'

def generate_key():
    return os.getpid(), secrets.token_bytes(16)

def to_binary(b: bytes):
    return ''.join(['{:08b}'.format(c) for c in b])

def from_binary(s: str):
    return bytes(int(s[i:i+8], 2) for i in range(0, len(s), 8))

def encrypt(key: bytes, message: bytes):
    cipher = AES.new(key, AES.MODE_ECB)
    return cipher.encrypt(message) 

key1, key2 = generate_key()

print(f'Using Key:\n{key1}:{key2.hex()}')

def get_flag():
    flag = input('Enter the flag to encrypt: ')
    if not flag.startswith('sdctf{') or not flag.endswith('}') or not flag.isascii():
        print(f'{flag} is not a valid flag for this challenge')
        sys.exit(1)
    return flag

plaintext = get_flag()[6:-1]

data = plaintext.encode(ENCODING)

codes = list(''.join(chr(i) * 2 for i in range(0xb0, 0x1b0)))
random.seed(key1)
random.shuffle(codes)
sboxes = [''.join(codes[i*4:(i+1)*4]) for i in range(128)]

if len(set(sboxes)) < 128:
    print("Bad key, try again")
    sys.exit(1)

data = ''.join(sboxes[c] for c in data).encode(ENCODING)
data = encrypt(key2, to_binary(data).encode(ENCODING))

random.seed(key1)
key_final = bytes(random.randrange(256) for _ in range(16))

data_bits = list(to_binary(data))
random.shuffle(data_bits)
data = from_binary(''.join(data_bits))

ciphertext = encrypt(key_final, data)

print(f'Encrypted: {ciphertext.hex()}')
with open('enc.bin', 'wb') as ef:
    ef.write(ciphertext)

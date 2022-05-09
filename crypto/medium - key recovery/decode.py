#! /usr/bin/env python3
# https://coolaj86.com/articles/the-openssh-private-key-format/
import base64, struct
from io import BytesIO
import sys

from Crypto.Util.number import isPrime

MAGIC = b"openssh-key-v1\0"
ENDIANNESS = 'big'
BYTE_ORDER_STRUCT = '>'

FILE = sys.argv[1]

with open(FILE) as pk:
    lines = list(pk)
    b64 = ''.join((line[:-1] for line in lines[1:-1]))
    bys = base64.b64decode(b64)

bstream = BytesIO(bys)

magic = bstream.read(len(MAGIC))
assert magic == MAGIC

def readint(b: BytesIO):
    ib = b.read(4)
    assert len(ib) == 4
    return struct.unpack(BYTE_ORDER_STRUCT + 'I', ib)[0]

def read64(b: BytesIO):
    ib = b.read(8)
    assert len(ib) == 8
    return struct.unpack(BYTE_ORDER_STRUCT + 'Q', ib)[0]

# Read length prefixed data
def readdata(b: BytesIO):
    l = readint(b)
    print(f'DEBUG position: {b.tell()}')
    d = b.read(l)
    assert len(d) == l
    return d

print('ciphername:', readdata(bstream).decode())
print('kdfname:', readdata(bstream).decode())
print('kdf:', readdata(bstream))
print('Number of keys:', readint(bstream))

print("--- Public key info ---")
bpk_bytes = readdata(bstream)
bpk = BytesIO(bpk_bytes)
print('Public key type:', readdata(bpk).decode())
pub0 = readdata(bpk) # RSA: e
pub1 = readdata(bpk) # RSA: n
print('pub0:', pub0.hex())
print('pub1:', pub1.hex())
print("--- Public key info end ---")
assert bpk.tell() == len(bpk_bytes)

print("--- Private key info ---")
prv_bytes = readdata(bstream)
prv = BytesIO(prv_bytes)
print('checksum:', hex(read64(prv)))
keytype = readdata(prv).decode()
print('key_type:', keytype)
pub0_ = readdata(prv) # RSA: n
pub1_ = readdata(prv) # RSA: e
assert pub0_ == pub1
assert pub1_ == pub0
if keytype == 'ssh-rsa':
    # Supporting evidence: https://github.com/openssh/openssh-portable/blob/69928b106d8f0fa15b88cf3850d992ed81c44ae0/sshkey.c#L3253
    prv0 = readdata(prv)
    print('prv0: ', prv0.hex()) # d, confirmed
    prv1 = readdata(prv)
    print('prv1: ', prv1.hex()) # iqmp
    prv2 = readdata(prv)
    print('prv2: ', prv2.hex()) # p (or q), confirmed
    prv3 = readdata(prv)
    print('prv3: ', prv3.hex()) # q (or p), confirmed
    print('comment: ', readdata(prv).decode()) # Comment
    e = int.from_bytes(pub0, ENDIANNESS)
    n = int.from_bytes(pub1, ENDIANNESS)
    d = int.from_bytes(prv0, ENDIANNESS)
    iqmp = int.from_bytes(prv1, ENDIANNESS)
    p = int.from_bytes(prv2, ENDIANNESS)
    q = int.from_bytes(prv3, ENDIANNESS)
    try:
        assert isPrime(p)
        assert isPrime(q)
        assert p * q == n
        lamb = (p - 1) * (q - 1) # Use Euler's totient function
        assert (e * d) % lamb == 1
        assert (iqmp * q) % p == 1
    except AssertionError:
        print('*** Invalid private key! ***')
else:
    print("Unable to decode more. Only support RSA private key for now!")

print('remaining_data:', prv.read().hex())
print("--- Private key info end ---")

assert bstream.tell() == len(bys)


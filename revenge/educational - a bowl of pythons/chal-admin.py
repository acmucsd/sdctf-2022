# **** Annotated source code with names not obfuscated ****
# *********** DO NOT RELEASE TO PARTICIPANTS **************
# import sys

FAKE_FLAG = 'sdctf{a_v3ry_s3cur3_w4y_t0_st0r3_ur_FLAG}'

# Get the (n+1)th lucas number
def lucas_key(n):
    if n < 2:
        return 2 if n == 0 else 1
    return lucas_key(n-2) + lucas_key(n-1)

def unhex(hexstring: str) -> str:
    return bytes.fromhex(hexstring).decode()

def fail():
    # assert False # debug, get trace
    # print('Incorrect flag! You need to hack deeper...')
    print(unhex('496e636f727265637420666c61672120596f75206e65656420746f206861636b206465657065722e2e2e'))
    # sys.exit(1)
    eval(unhex('5f5f696d706f72745f5f282273797322292e65786974283129'))
    print(FAKE_FLAG) # Fake flag prompt, unreachable code

def main(flag_check: bytes):
    print("Welcome to SDCTF's the first Reverse Engineering challenge.")
    flag_given = input("Input the correct flag: ")
    # check start 'sdctf{'
    if flag_given[:6].encode().hex() != '{2}3{0}{1}{0}3{2}{1}{0}{0}{2}b'.format(*map(str, [6, 4, 7])):
        fail()
    # check ending '}'
    if flag_given[int(chr(45) + chr(49))] != chr(125):
        fail()
    flag_encoded = flag_given[6:-1].encode()
    if bytes( (flag_encoded[i] ^ (lucas_key(i) & 0xff) for i in range(len(flag_encoded))) ) != flag_check:
        fail()
    # print('Nice job. You got the correct flag!')
    print(unhex('4e696365206a6f622e20596f7520676f742074686520636f727265637420666c616721'))

# print(list(map(lucas_key, range(10))))
if __name__ == "__main__":
    main(b'vdpp*m~|H')

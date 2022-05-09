#! /usr/bin/env python3
# FLAG is the part between sdctf{} (Ex. if the flag is `sdctf{abcd}`, then FLAG = 'abcd')
FLAG = b'an_3xtra_YuMMY_LaZagnA'
# b't2q}*\x7f&n[5V\xb42a\x7f3\xac\x87\xe6\xb4'
# flag:
# sdctf{v3ry-t4sty-sph4g3tt1}

# Get the (n+1)th lucas number
def lucas_key(n):
    if n < 2:
        return 2 if n == 0 else 1
    return lucas_key(n-2) + lucas_key(n-1)

flag_check = bytes( (FLAG[i] ^ (lucas_key(i) & 0xff) for i in range(len(FLAG))) )

PATCH_ME_PATTERN = '__PATCH_ME__'

# Make your to update the last line of this challenge when the flag changes
with open('chal-template.txt') as template, open('chal.py', 'w') as challenge:
    challenge.write(template.read().replace(PATCH_ME_PATTERN, str(flag_check)))

print('Challenge patched successfully')

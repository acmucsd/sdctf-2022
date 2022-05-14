# Rbash — Negotiation with the warden
## JAIL - Hard
| author | first blood | solves | points |
| --- | -- | --- | --- |
| k3v1n | CøsmicEquation from **Th3EventH0riz0n** | 10 | 350 |
### prompt
You now have the right to negotiate your PATH with your prison warden. Same deal as the warmup: Get the flag by executing the /flag binary. Good luck!

Connect via: `socat FILE:'tty',raw,echo=0 TCP:warden.sdc.tf:1337`

### original specification
Attachment `jail.zip` contains `trash/`, `workdir/`, and `jail.py`

Every time one exits from rbash one is presented with 4 choices:

1. Add a component to PATH
2. Remove a component from PATH (not sure why you want to deprive yourself of privileges?)
3. Write/modify a note
4. Change my permissions to access a note
5. Quit

Implementation:
1. Either doesn't work or only allows adding back a specific set of safe PATHs (that is, the directories should either be empty or contain only an unexploitable junk binary)
2. Works, but uses an unsafe algorithm that can potentially remove ALL components of the path leaving "" behind, which automatically includes CWD (this either pwns the warden or allow executing anything there). See https://stackoverflow.com/a/370192 and the security concern.
3. Will print "No flag for you. Prisoner!"
4. Exit

**flag:** `sdctf{1_f0unD_MY_p4TH_t0_E5c4pe_THE_JA1L:th3_3mpty_str1ng!}`

### write-ups
1. https://github.com/qhdwight/ctf-writeups/tree/master/sd-ctf-2021/rbash-negotiation-with-the-warden
# ShamAV
## PWN - Hard
| author | first blood | solves | points |
|--------| --- | --- | --- |
| k3v1n  | _ | 0 | 0 |
### prompt
We just developed a new anti-virus called ShamAV. Have fun.

Connect via:
`socat FILE:'tty',raw,echo=0 TCP:shamav.sdc.tf:1337`

Note:
- Flag is at /home/antivirus/flag.txt. The permission of flag.txt is intended.
- Ignore /home/user/, you don’t need to access anything under it to get the flag 

### original specification
Note: there is no attachment available for download. Since the player is given a bash prompt, one should be able to cat challenge files (including antivirus source code) as needed. This encourages them to actually discover the challenge piece by piece.

Flag path: /home/antivirus/flag.txt (not readable by user ctf)

Allow participants to log into a remote machine via SSH. Each participant gets an isolated environment built from tmpfs so they do not interfere with each other (exploit requires modification of files). On each participant's machine, there must be these 2 users:
1. antivirus - The user of the antivirus process
2. ctf - The only user the participant is allowed to log into

User antivirus is the exploit target, and it runs process /home/antivirus/server.py (the antivirus process, not writable by anyone except antivirus) before ctf logs in. User ctf may request from av to scan a file by running the scan command, which internally uses a Unix domain socket to contact the server.

You can present the operations in any order you want.

Vulnerabilities:
https://en.wikipedia.org/wiki/Symlink_race. The antivirus creates files in /tmp/ directly (insecurely) without using mktemp. The <random_string> part is a pseudorandom stream generated from SHA256 hashes. One need to know the seed to predict them. But once you predict, you can exploit it to overwrite the antivirus binary.

The seed can be read by an arbitrary read vulnerability (but that alone is not enough to read the flag due to its 000 permissions) from the copying process of scanning (and another lstat symlink vulnerability).

Inspired by: https://www.zdnet.com/article/symlink-race-bugs-discovered-in-28-antivirus-products/

**flag:** `sdctf{5ymL1Nks_ar3_4_curs3d_f3a7uRe_0f_*NIX}`


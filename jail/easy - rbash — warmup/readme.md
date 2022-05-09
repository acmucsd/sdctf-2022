# Rbash — Warmup
## JAIL - Easy
| author | first blood | solves | points |
|--------| --- | --- | --- |
| k3v1n  | _ | 0 | 0 |
### prompt
Welcome to the restricted shell! Demonstrate RCE on this rbash setup by running the  /flag binary executable, and you will be awarded with the flag!

Connect via: `socat FILE:'tty',raw,echo=0 TCP:rbash-warmup.sdc.tf:1337`

### original specification
rbash with a vulnerable binary on PATH that would allow RCE, which is nc! (netcat-traditional)

Participants can find it by doing `echo $PATH, echo /path/to/whitelist/*` to list the directory, and discovering it

**flag:** `sdctf{nc--e-IS-r3aLLy-D4NG3R0U5!}`


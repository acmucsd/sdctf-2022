# Flag Trafficker
## FORENSICS - Easy
| author | first blood | solves | points |
| --- | -- | --- | --- |
| Aaron James | NatanelGu from **pwnjuice** | 209 | 150 |
### prompt
We've sniffed the traffic of somebody suspected to be looking up flags online! Unfortunately, just searching for the flag format in their traffic doesn't appear to be working...can you find the leaked flag?

### original specification
Network traffic analysis. Contains a capture of a person visiting a bunch of websites, one of which is "flag.knoxdev.github.io" or something. The page in question displays a flag using javascript written in JSFuck.

Requires the user to find the HTTP request, download the JS, and execute it to obtain the flag.

**flag:** `sdctf{G3T_F*cK3d_W1r3SHaRK}`

### write-ups
1. https://github.com/bhavya-error404/CTFs-Writeups/blob/main/SDCTF/Forensics/Flag-Tracfficker.md
2. https://github.com/thewhitecircle/ctf_writeups/blob/main/sdctf_2022/forensics.md
3. https://ctftime.org/writeup/33742
4. https://github.com/ninnikukawaii/write-ups/tree/master/San%20Diego%20CTF%202022/forensics/flag-trafficker
5. https://ctftime.org/writeup/33721
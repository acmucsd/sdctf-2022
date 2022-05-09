# Needle in a haystack
## FORENSICS - Educational
| author | first blood | solves | points |
| --- | --- | --- | --- |
| Aaron James | _ | 0 | 0 |
### prompt
This challenge exists to teach some of the basic skills used in the Forensics category. If you follow along with the tutorial to solve the challenge yourself, you'll be given a new flag as proof of your efforts.

**Original Prompt**: Find the flag in this haystack!

**Video Tutorial**: https://youtu.be/Ar5Xg-Ovn3I

### original specification
Attach a huge binary file with flag embedded within it. Use strings to dump the message "this message seems a bit off..."

Rotating 1 bit left (with carry over) will fix the problem.
The resulting file is a png that displays a poorly drawn flag.

**flag:** `sdctf{G00D_Work!1}`


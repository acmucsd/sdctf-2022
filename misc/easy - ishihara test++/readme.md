# Ishihara test++
## MISC - Easy
| author | first blood             | solves | points |
| --- |-------------------------| -- | --- |
| Nick Petrone | Sean from **bugs@UCSD** | 173 | 100 |
### prompt
I don't think the person who made this knew what they were doing. Aren’t you supposed to see some kind of number or something in the middle?

### original specification
In a rectangular SVG there are 10s of thousands of dots that are one of 6 almost-the same colors. The dots are styled by 6 CSS classes. Isolating a single color at a time by making all other class colors transparent shows that there’s a region around the middle where certain colors of dots avoid. These dots are the colors that comprise the flag. By taking each color that has that middle separation and making it a dark color while making all other off colors transparent, the flag will be spelled out by multiple classes of dots.

**flag:** `sdctf{c0untle55_col0rfu1_c0lors_cov3ring_3veryth1ng}`

# write-ups
1. https://github.com/Happy-hub/CTF/tree/main/2022/SanDiegoCTF/ishihara-test
2. https://sheeptester.github.io/longer-tweets/ctf/#a-svgcss-based-challenge
3. https://github.com/thewhitecircle/ctf_writeups/blob/main/sdctf_2022/misc.md#ishihara-test
4. https://mikecat.github.io/ctf-writeups/2022/20220507_San_Diego_CTF_2022/MISC/Ishihara_test/
5. https://ctftime.org/writeup/33731
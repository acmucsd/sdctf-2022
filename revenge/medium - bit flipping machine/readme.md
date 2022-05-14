# Bit flipping machine
## REVENGE - Medium
| author | first blood | solves | points |
| --- | -- | --- | --- |
| k3v1n | despawningbone from **Maple Bacon** | 32/12 | 110/130 |
### prompt
We just made a machine that can remotely flip bits to change the memory contents of enemy computers. You are tasked with demonstrating the power of this machine to skeptics by changing their demanded strings to match the target strings.

But wait, the awkward word-size of this machine seems to restrict what input you can give...

**Connect via**:
`nc flip.sdc.tf 1337`

**Note**: there are two flags for this challenge. You will get the first one for passing the “warmup” challenge and the second one after passing the “final” challenge.

### original specification
The restriction is to be able to flip only an even number of bits (that is, the parity of the message is invariant), making it impossible to change a message into other if their parities differ.

It will start with a warmup task whose source parity matches the target parity.

It will then go to the "challenge" task where you need a parity change.

The binary will use C++ and thus allow reading lines with null characters. The string length check is responsible for ensuring an even number of bits is flipped, but the actual processing code is written in C (or at least assume '\0' is the end of the string) with conversion via std::string.cstr(). Each pair of characters describe the byte/bit index to flip (0-9), invalid numbers lead to instant kickout.

Intermediate Flag (first): point value: 110
Final (second): point value: 130

**flags:** `sdctf{s3Cr3T_C0d3_15_RaDIx26_b1t_p0SIti0n5}`, `sdctf{nu11_t3rmin4tED_C_str1ngs_ar3_4_p41nFuL_l3GaCY}`
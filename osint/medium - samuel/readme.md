# Samuel
## OSINT - Medium
| author | first blood | solves | points |
| --- | --- | --- | --- |
| k3v1n | _ | 0 | 0 |
### prompt
Where is this?

https://www.youtube.com/watch?v=fDGVF1fK1cA

**Flag format**:
sdctf{latitude,longitude} using decimal degrees and 3 decimal places rounded toward zero (Ex. 4.1239 → 4.123, -4.0009 → -4.000)

**Example**:
If the location were https://goo.gl/maps/TnhzfxXKg9TDYDfR9 the flag would be sdctf{38.889,-77.035}

### original specification
Samuel is the first name of "Samuel Morse", the inventor of Morse 
Take a picture containing What Hath God Wrought and possibly a UCSD sign in the picture as a hint, but exclude the buildings around it.

Remember to remove EXIF tags, etc.

Pole base location:
Google plus code: VQG5+6PR San Diego, California
https://goo.gl/maps/rU45kRSDG54ozm4F9
32°52'32.3"N 117°14'26.7"W
32.875625, -117.240749

**flag:** `sdctf{32.875,-117.240}`


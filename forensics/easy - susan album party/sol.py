import random

with open("stub", "rb") as f:
    file_bytes = f.read()

file_ending = file_bytes.rindex(b'\xff\xd9')
file_count = 1

while True:
    file_start = file_bytes.rindex(b'\xff\xd8', 0, file_ending)
    with open(f"{file_count}_extracted.jpg", "wb") as f:
        f.write(file_bytes[file_start:file_ending])
    file_count += 1
    file_ending = file_bytes.rindex(b'\xff\xd9', 0, file_start)
import random

file_bytes = []

with open("1.jpg", "rb") as f1:
    file_bytes.append(f1.read())

file_bytes.append(random.randbytes(2412))

with open("2.jpg", "rb") as f2:
    file_bytes.append(f2.read())

file_bytes.append(random.randbytes(4938))

with open("3.jpg", "rb") as f3:
    file_bytes.append(f3.read())

file_bytes.append(random.randbytes(3433))

with open("stub", "wb") as f:
    f.write(b''.join(file_bytes))
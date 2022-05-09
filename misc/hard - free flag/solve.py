from imageio import v3 as iio
import functools

SECRET_PERMUTATION_TABLE = [7, 4, 2, 6, 0, 1, 3, 5]
SECRET_UNPERMUTATION_TABLE = [4, 5, 2, 6, 1, 7, 3, 0]

# read all the raw bytes from the image
im_bytes = iio.imread('./touched.png', mode="RGBA")

# first, just throw all two LSB bits into a big list
lsb_bytes = [byte & 0b11 for row in im_bytes for pixel in row for byte in pixel]

# next, we'll recombine the 2 LSB bits into 8 bit values
permuted_bytes = [lsb_bytes[i] | (lsb_bytes[i+1] << 2) | (lsb_bytes[i+2] << 4) | (lsb_bytes[i+3] << 6) for i in range(0, len(lsb_bytes) - 4, 4)]

# now we'll unpermute the byte sequence using the SECRET PERMUTATION TABLE
unpermuted_bytes = [functools.reduce(lambda a,b: a | b, [((byte >> i) & 1) << j for (i, j) in enumerate(SECRET_UNPERMUTATION_TABLE)]) for byte in permuted_bytes]

# print an arbitrary number of characters to verify the result
print(''.join([chr(b) for b in unpermuted_bytes[0:69]]))
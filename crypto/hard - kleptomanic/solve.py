import time

# returns the modular multiplicative inverse of a number, only when the modulus is prime
# by using Fermat's Little Theorem
def invModPrime(num, mod):
  return pow(num, mod - 2, mod)

# Doubles a given point over the provided curve
def doubleECPoint(curve, P):
  (a, b, prime) = curve
  (px, py) = P
  if P == (0, 0):
    return (0, 0)
  lam = (3 * px * px + a) * invModPrime(2 * py, prime)
  rx = (lam * lam - px - px) % prime
  ry = (lam * (px - rx) - py) % prime
  return (rx, ry)

# Adds two given points over the provided curve
def addECPoints(curve, P, Q):
  (a, b, prime) = curve
  (px, py) = P
  (qx, qy) = Q
  if P == (0, 0):
    return Q
  elif Q == (0, 0):
    return P
  elif P == Q:
    return doubleECPoint(curve, P)
  lam = (qy - py) * invModPrime(qx - px, prime)
  rx = (lam * lam - px - qx) % prime
  ry = (lam * (px - rx) - py) % prime
  return (rx, ry)

# Multiply a given point with a scalar over the provided curve
def mulECPointScalar(curve, P, d):
  if d == 0:
    return (0, 0)
  elif d == 1:
    return P
  elif d % 2 == 1:
    Q = mulECPointScalar(curve, P, d-1)
    return addECPoints(curve, P, Q)
  else:
    Q = mulECPointScalar(curve, P, d//2)
    return doubleECPoint(curve, Q)

# the NIST p-256 curve, (a, b, prime)
(a, b, prime) = (-3, 0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b, 0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff)
P = (0x1c1259e8bc9ba0823e5ad8480586b26d1f33f52600a3204aeb57c8f4d87434b9, 0xb422ac1753c053f6270bbcab5aa63cfad40534a8d1df8e5425ed597b6c5cf4c2)
Q = (0xc97445f45cdef9f0d3e05e1e585fc297235b82b5be8ff3efca67c59852018192, 0xb28ef557ba31dfcbdd21ac46e2a91e3c304f44cb87058ada2cb815151e610046)

# uses Euler's Criterion to determine if a is a square mod p, returns true if so
def euler_crit(a, p):
    return (pow(a, (p-1)//2, p) - 1) % p == 0

# multiply together two tuples representing elements of a 2-dimensional finite field extension
def mult_field(t1, t2, p, e):
    (x1, y1) = t1
    (x2, y2) = t2
    return ((x1*x2 + y1*y2*e) % p, (x1*y2 + x2*y1) % p)

# recursively computes via square and multiply the power of this tuple in a 2-dim finite field extension
def exp_field(t, n, p, e):
    (x, y) = t
    if n == 1:
        return (x, y)
    if n % 2 == 0:
        halved_result = exp_field((x, y), n//2, p, e)
        return mult_field(halved_result, halved_result, p, e)
    smaller_result = exp_field((x, y), n-1, p, e)
    return mult_field(smaller_result, (x, y), p, e)

# uses Cipollas algorithm to compute the square of n in mod p
def cipolla(n, p):
    # phase one: find an a such that a^2 - n is not a square
    for a in range(2, p):
        maybe_square = pow(a, 2, p) - n
        if not euler_crit(maybe_square, p):
            break
    # phase 2: compute big value in a finite field extension idk its complicated
    return exp_field((a, 1), (p+1)//2, p, maybe_square)[0]

# almighty secret value
d = 0x5b8c0adce49783789b6995ac0ec3ae87d6005897f0f2ddf47e2acd7b1abd

current_val = int(input("feed me the first value it thought of: "), 16)
next_val = int(input("feed me the second value it thought of: "), 16)

# iterate over all possible top 8 bits and find which candidate points can be on the curve
possible_orig_points = []
for topbits in range(0, 2**8):
    x_guess = (topbits << 248) | current_val
    y_squared = ((((((x_guess * x_guess) % prime) + a)*x_guess) % prime) + b) % prime
    # if this number is not a square, we can go ahead and try the next possible bit
    if not euler_crit(y_squared, prime):
        continue
    # compute the square root using cipolla's algorithm
    y = cipolla(y_squared, prime)
    # add the x, y pair to the list of possible points
    possible_orig_points.append((x_guess, y))
    # also the inverse corresponding with the two solutions for each sqrt
    possible_orig_points.append((x_guess, (-y % prime)))

print("possibilities: ", len(possible_orig_points))

startingTime = int(time.time())
currentTime = int(time.time())

# iterate over the potential curve points and check
while possible_orig_points[-1]:
    orig_point = possible_orig_points.pop()
    next_P = mulECPointScalar((a, b, prime), orig_point, d)
    next_rand = mulECPointScalar((a, b, prime), Q, next_P[0])[0] & 0x00ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    if next_rand == next_val:
        next_next_P = mulECPointScalar((a, b, prime), P, next_P[0])
        next_next_rand = mulECPointScalar((a, b, prime), Q, next_next_P[0])[0] & 0x00ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        print("TRY GUESSING: ", hex(next_next_rand))
        exit(0)

    if int(time.time()) - currentTime > 10:
        currentTime = int(time.time())
        print("items remaining to check: ", len(possible_orig_points))
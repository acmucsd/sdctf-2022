import random
import hmac

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
NIST_256_CURVE = (-3, 0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b, 0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff)
# p, chosen securely and arbitrarily...
P = (0x1c1259e8bc9ba0823e5ad8480586b26d1f33f52600a3204aeb57c8f4d87434b9, 0xb422ac1753c053f6270bbcab5aa63cfad40534a8d1df8e5425ed597b6c5cf4c2)
# q, not any q in particular...
Q = (0xc97445f45cdef9f0d3e05e1e585fc297235b82b5be8ff3efca67c59852018192, 0xb28ef557ba31dfcbdd21ac46e2a91e3c304f44cb87058ada2cb815151e610046)

# randomly generate initial state
state = random.randrange(1, NIST_256_CURVE[2])

print('Welcome to the Thieves Lair! Can you prove your membership by predicting the future?\n')
print(f'I\'m thinking of a number between 0 and {NIST_256_CURVE[2]}...')

while 1:
    guess_str = input("Guess the number I'm thinking of (in hexadecimal):")
    try:
        guess = int(guess_str, 16)
    except ValueError:
        continue

    print(f'You guessed: {hex(guess)}')

    # generate next internal state
    state = mulECPointScalar(NIST_256_CURVE, P, state)[0]
    randval = mulECPointScalar(NIST_256_CURVE, Q, state)[0] & 0x00ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff

    # timing safe comparison
    if hmac.compare_digest(randval.to_bytes(256, 'big'), guess.to_bytes(256, 'big')):
        print('Wow! You guessed correctly! That\'s kinda scary. Here\'s your flag, sir.')
        with open('FLAG') as f:
            print(f.readlines()[0])
        exit(0)

    print(f'Not quite right, I was thinking of {hex(randval)}')
    print('Lets try that again...\n')

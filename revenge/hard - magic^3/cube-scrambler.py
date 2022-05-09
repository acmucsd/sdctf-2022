#! /usr/bin/env python3
from sage.all import *
import secrets
import magic_common


C = CubeGroup()
POSSIBLE_MOVES = 'FBLRUD'

# God's number in Quarter Turn metric is 26
NUM_MOVES = 30

# moves = ' '.join((secrets.choice(POSSIBLE_MOVES) + secrets.choice(['', "'"]) for _ in range(NUM_MOVES)))
moves = "U F B R D L R' U F' U D' R R' B F' B' D' D L' F' B L D' D D' L' L' L' R B'"

print('Generated moves:', moves)

# solved_moves = C.solve(moves)
solved_moves = "R2 F' R2 F2 L2 U2 R2 D2 F' U' L' B U D' R U B L2 D2 F2"
smoves_list = solved_moves.split(' ')
print(f'Solved moves: {solved_moves}, Length: {len(smoves_list)}')

def pw_iter():
    for smove in smoves_list:
        fc = smove[0].lower()
        if len(smove) == 1:
            yield fc
        elif smove[1] == '2':
            yield fc * 2
        elif smove[1] == "'":
            yield fc * 3

scramble = C.parse(moves) ** -1 # type: ignore
print(f"Permutation cycles to scramble: {scramble}")

print("Password:", ''.join(pw_iter()))
print('*** Initialization code ***')
print(magic_common.gen_cycle_magic('', scramble))
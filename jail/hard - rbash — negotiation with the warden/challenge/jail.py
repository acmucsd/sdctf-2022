#! /usr/bin/env python3

import os, os.path, string
from typing import List

WORKDIR_ENV = 'WORKDIR'

base = os.path.abspath(os.path.dirname(__file__))

workdir = os.path.join(base, 'workdir') if WORKDIR_ENV not in os.environ else os.environ[WORKDIR_ENV]
print("You are currently in", workdir)

os.chdir(workdir)

WHITELIST_PATHS = [base + s for s in ['/bin', '/junk', '/trash']]

PATH_LIST = WHITELIST_PATHS[1:]

def print_paths(pathlist: List[str]) -> None:
    for i, path in enumerate(pathlist):
        print('{}: {}'.format(i + 1, path))

VALID_NOTE_NAMES = string.ascii_letters + string.digits
INVALID_NOTE_NAME_MSG = "Invalid note name. Must be alphanumeric."

def check_note_name(note_name: str) -> bool:
    for c in note_name:
        if c not in VALID_NOTE_NAMES:
            return False
    return True

MAXOPT = 7

def menu():
    print("""
Welcome to the warden's office.
Here are your options, prisoner:
1. Leave a note
2. Read a note
3. Ask the warden to change my permission to read/write notes
4. Show my permitted PATHs
5. Add a permitted PATH
6. Deprive myself of a permitted PATH
7. Return to my jail cell
""")

def main():
    while True:
        menu()
        try:
            optstr = input("> ")
        except EOFError:
            break
        try:
            opt = int(optstr)
            if not 1 <= opt <= MAXOPT:
                raise ValueError
        except ValueError:
            print('Invalid option: {}'.format(optstr))
            continue
        if opt == 1: # write a note
            print('Wanna document your prison life, huh?')
            note_name = input('Note name> ')
            if not check_note_name(note_name):
                print(INVALID_NOTE_NAME_MSG)
                continue
            try:
                nlines = int(input('How many lines do you want to write?\n> '))
                if nlines < 0:
                    raise ValueError
            except ValueError:
                print('Invalid number!')
                continue
            print('Please input your note in the {} lines below'.format(nlines))
            try:
                with open('{}.txt'.format(note_name), 'w') as nf:
                    nf.writelines((input() + '\n' for _ in range(nlines)))
            except OSError as e:
                print('Error:', e)
            else:
                print('Successfully written note {}.'.format(note_name))
        elif opt == 2: # read a note
            print("Can't you remember what you just wrote?")
            note_name = input('Note name> ')
            if not check_note_name(note_name):
                print(INVALID_NOTE_NAME_MSG)
                continue
            try:
                with open('{}.txt'.format(note_name)) as nf:
                    for line in nf:
                        print(line, end='')
            except OSError as e:
                print('Error:', e)
            else:
                print('<end of note>')
        elif opt == 3: # Ask the warden to change my permission to read/write notes
            print("Uhh... sure. Since the notes are yours I don't care about the permissions.")
            note_name = input('Note name> ')
            if not check_note_name(note_name):
                print(INVALID_NOTE_NAME_MSG)
                continue
            print('Now enter the permission as a Unix octal mode, similar to the argument to the chmod command')
            print("For example, if you don't want to accidentally overwrite a note, the permission can be 400")
            permstr = input('Permission> ')
            if len(permstr) != 3:
                print('Invalid permission. Must be exactly 3 octal digits')
                continue
            for c in permstr:
                if c not in '01234567':
                    print('Invalid permission. A non-octal digit is found: {}'.format(c))
                    break
            else:
                try:
                    os.chmod('{}.txt'.format(note_name), int(permstr, base=8))
                except OSError as e:
                    print('Error:', e)
        elif opt == 4: # Show my permitted PATHs
            print_paths(PATH_LIST)
        elif opt == 5: # Add a permitted PATH
            print("Want more paths to escape? But sorry you are only allowed to take some of our prespecified paths below:")
            print_paths(WHITELIST_PATHS)
            pathnumstr = input('Select which paths to add (1-{})> '.format(len(WHITELIST_PATHS)))
            try:
                pathnum = int(pathnumstr)
                if not 1 <= pathnum <= len(WHITELIST_PATHS):
                    raise ValueError
            except ValueError:
                print('Invalid index: {}'.format(pathnumstr))
                continue
            PATH_LIST.append(WHITELIST_PATHS[pathnum - 1])
        elif opt == 6: # Deprive myself of a permitted PATH
            print("Weird. I have never seen a prisoner who wants to voluntarily give up their own rights. But whatever.")
            if not PATH_LIST:
                print('You have no paths! Try adding one.')
                continue
            print_paths(PATH_LIST)
            pathnumstr = input('Select which path to remove (1-{})> '.format(len(PATH_LIST)))
            try:
                pathnum = int(pathnumstr)
                if not 1 <= pathnum <= len(PATH_LIST):
                    raise ValueError
            except ValueError:
                print('Invalid index: {}'.format(pathnumstr))
                continue
            del PATH_LIST[pathnum - 1]
        elif opt == 7: # Return to my jail cell
            os.environ['PATH'] = ':'.join(PATH_LIST)
            os.system("/bin/rbash --norc --noprofile")
            # os.system("/bin/bash --rcfile \"{}\" --noprofile".format(base + '/restrict.sh'))

if __name__ == "__main__":
    main()

#! /usr/bin/env python3
# flag2.txt and proprietary.py are in the working directory of the script in the hosted version
import sys
import proprietary # Our secure proprietary flag hider for flag1.txt

PROMPT = '>>> '

# Old Python versions are too vulnerable to exploits
if sys.version_info[:3] < (3, 8, 5):
    print("Sorry, your Python interpreter version is below the minimum system requirement to run HAXLAB.")
    sys.exit(1)

def audit_hook(event, _):
    # These are the only necessary events for this Math REPL to work
    ALLOWED_EVENTS = set({'builtins.input', 'builtins.input/result', 'exec', 'compile'})
    if event not in ALLOWED_EVENTS:
        # Thou shalt not hack!
        raise RuntimeError('Operation not permitted: {}'.format(event))

flag1 = proprietary.get_flag1()

def repl():
    global_dict = dict()
    global_dict['flag1'] = flag1
    while True:
        try:
            src = input(PROMPT)
        except EOFError:
            print() # print newline
            break
        except KeyboardInterrupt:
            print('canceled')
            continue
        if src == '': # Skip empty lines
            continue
        try:
            code = compile(src, '<string>', 'single')
        except SyntaxError as e:
            print(e)
            continue
        try:
            exec(code, global_dict)
        except Exception as e:
            print(e)

print('======= HAXLAB - An advanced yet secure calculator =======\nPowered by Python ' + sys.version)
# You will never trigger these hooks if all you do is Math :)
sys.addaudithook(audit_hook)
del sys
try:
    # Enter the HAXLAB shell for the user to do Math
    repl()
except Exception as e:
    print(e)

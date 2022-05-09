#! /usr/bin/env python3
import base64, socket, os, hashlib, shutil, sys

USER_UID = 1002
CTR_LENGTH = 256
STDIO_DEBUG = False

ctr = 0
malware_hashes = set()

with open('malware-hashes.txt') as f:
    for line in f:
        malware_hashes.add(line.strip())

with open('seed') as f:
    seed = base64.b64decode(f.read())
    # Read from a seed file to make the behavior more reproduce-able
    # Make testing a lot easier

def log(s: str):
    print(s, file=sys.stderr, flush=True)

def genrandom():
    global ctr
    result = hashlib.sha256(ctr.to_bytes(CTR_LENGTH, byteorder='little') + seed).hexdigest()
    ctr += 1
    return result

def is_malware(file: str):
    with open(file, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest() in malware_hashes

def _scan(path: str):
    log(f'[I] Scanning file {path}')
    try:
        if os.lstat(path).st_uid != USER_UID:
            return "You do not have permission to scan this item"
    except OSError as e:
        return f'Error from OS: {e}'
    target_path = f'/home/antivirus/quarantine/sham-av-{genrandom()}'
    log(f'[D] Copying file from {path} to {target_path}')
    try:
        shutil.copyfile(path, target_path)
        if is_malware(target_path):
            log(f'[I] Found malware at {path}')
            return f'***** Malware detected! File quarantined at {target_path} *****'
    except IsADirectoryError as e:
        return f'An error occurred: {e}'
    return "File scan completed. No malware detected."

def scan(path: str):
    res = _scan(path)
    log(f'[I] Scan complete: {path}')
    return res

SOCKET_FILE = 'socket'
BS = 4096

def recvall(sock):
    chunks = []
    while True:
        chunk = sock.recv(BS)
        if chunk == b'':
            return b''.join(chunks)
        chunks.append(chunk)

while True:
    if STDIO_DEBUG:
        try:
            path = input()
        except EOFError:
            break
        print(f'Scan result: {scan(path)}')
    else:
        with socket.socket(socket.AF_UNIX, socket.SOCK_STREAM) as s:
            try:
                os.unlink(SOCKET_FILE)
            except FileNotFoundError:
                pass
            s.bind(SOCKET_FILE)
            os.chmod(SOCKET_FILE, 0o777)
            s.listen()
            while True:
                log(f'[I] Ready for the next client')
                conn, _ = s.accept()
                res = scan(recvall(conn).decode(errors='surrogateescape'))
                log(f'[I] Scan result: {res}')
                try:
                    conn.sendall(res.encode())
                except OSError as e:
                    log(f'[E] OS error on sendall: {e}')
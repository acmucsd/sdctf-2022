#! /usr/bin/env bash

set -e

cp -r /home/user/skel/antivirus /home/user/skel/ctf /tmp/

runuser -u antivirus -- cp -r -T /tmp/antivirus /home/antivirus
runuser -u antivirus -- tee /home/antivirus/flag.txt < /home/user/flag.txt > /dev/null
runuser -u antivirus -- mkdir --mode=777 /home/antivirus/quarantine
runuser -u antivirus -- chmod 000 /home/antivirus/flag.txt
runuser -u ctf -- cp -r -T /tmp/ctf /home/ctf

rm -r /tmp/ctf /tmp/antivirus

runuser -u antivirus /home/antivirus/launcher.sh &

echo "Welcome to a ShamAV-protected demo system"
echo "To scan a file for malware, run"
echo
echo "scan /path/to/file"
echo

cd /home/ctf

exec bash --norc -ic 'PATH="/home/ctf/bin/:$PATH" runuser -u ctf bash' 2>&1

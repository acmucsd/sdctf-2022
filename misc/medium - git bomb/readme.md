# Git Bomb
## MISC - Medium
| author | first blood | solves | points |
| --- | -- | --- | --- |
| k3v1n | **buffer owlerflow** | 33 | 175 |
### prompt
Welcome to git-commit-as-a-service (GCaaS). Give me your git repository and I will commit it for you.

Warning: we are currently in beta so you cannot download the repo afterwards.

Flag is located at `/flag`

Instructions:
1. Prepare your Git repo in a gzipped tarball using the provided script prepare-git-repo.sh
2. Run this command to upload:
curl -F 'repo=@/path/to/your/git/repo.tar.gz' https://gcaas.sdc.tf/


### original specification
Find some way to get a local git repository from the user without cloning (that is, get the folder containing the .git directory). Could be done by instructing users to send their tarball of the folder (or .tar.gz) to a TCP port or downloading from a private pastebin like secret GitHub gist, or even make a web interface for this challenge to allow uploading a file

Then run git commit. The trick is that to achieve RCE, add git hooks to the .git folder.

**flag:** `sdctf{4lw4y5_Us3_GIT_cl0nE_n3v3R_sn3ak_R3P0}`

### write-ups
1. https://mikecat.github.io/ctf-writeups/2022/20220507_San_Diego_CTF_2022/MISC/Git_Bomb/
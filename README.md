# SDCTF 2021

Here is the challenge and infrastructure files of [San Diego CTF 2021](https://sdc.tf).
Challenge files include source code that implement the challenge ideas.

This CTF was deployed on [Google Cloud Platform](https://cloud.google.com/) using the brilliant [kCTF](https://github.com/google/kctf) framework. Please check them out.

This CTF used the novel Discord-based [ctfbot](https://github.com/acmucsd/ctfbot) as its frontend.

### Disclaimer

**San Diego CTF** is managed by the [ACM chapter at UC San Diego's](https://acmucsd.com/) Cyber community.
We're a bunch of college students and SDCTF 2021 is over, so ***no support will be provided*** for the building, deploying, and managing of these challenges.
This repository is published as a courtesy in the hopes that it will be educational to those interested in cybersecurity.



## Contents

Each challenge is in its own subdirectory with its build files (Ex. Makefiles), generation scripts, and deploy files (Ex. Dockerfiles, challenge.yaml).
`README.md` inside those folders are summaries of the challenge, information about CTF performance, internal specifications (if available), and links to writeups (if provided).

## Build and Deploy Instructions

First time setup for deployment: do the following in the given order

1. Setup [`kctf` environment](https://google.github.io/kctf/) (lol don't underestimate this)
2. Run command `./build-all.sh`. This is necessary to generate both attachments and deployment files.
3. Run command `kctf chal start` in every directory containing `challenge.yaml` (Tip: List them using `find . -name challenge.yaml`)
You can also currently run challenges locally (without deploying to a running cluster) with `kctf chal debug docker`. See [the official docs](https://google.github.io/kctf/local-testing.html) for more information.

After updating the source code of any challenge(s), remember to run `./build-all.sh` again (or the relevant `Makefile`s) so the attachment and/or deployment files can be updated. Then, run `kctf chal start` on the updated challenges to update the deployment.

We recommend building/running everything in [Google Cloud Shell](https://cloud.google.com/shell), which has a lot of tools (Ex. `gcc`) already built in.
However, there are some additional tools that you need to install as some `Makefile`s depends on them:

- Onelinerizer:
`pip2 install onelinerizer`
- Nasm: `sudo apt-get install nasm`
  - If you are using Google Cloud Shell, use `~/.customize_environment`. See the section below

## Google Cloud Shell

It is recommended to add the following to [`~/.customize_environment` in Google Cloud Shell](https://cloud.google.com/shell/docs/configuring-cloud-shell#environment_customization_script) so you have all the packages necessary to build or test the CTF.

```bash
#! /bin/bash
# Netcat/socat is useful when testing broken challenges. It is not necessary for building challenges
# Nasm is necessary to build some pwn challenges written in assembly
apt-get update -y && apt-get -y install netcat-openbsd socat nasm
```

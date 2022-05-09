# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
FROM ubuntu:20.04 as chroot

# Install packages
RUN apt-get update -y && apt-get install -y python3 socat
# Install packages end
RUN /usr/sbin/useradd --no-create-home -u 1000 user && \
    /usr/sbin/useradd --no-create-home -u 1001 antivirus && \
    /usr/sbin/useradd --no-create-home -u 1002 ctf

# Copies
COPY antivirus /home/user/skel/antivirus
COPY ctf /home/user/skel/ctf
RUN mkdir /home/ctf &&\
  mkdir /home/antivirus &&\
  chown ctf: /home/ctf/ &&\
  chown antivirus: /home/antivirus/
WORKDIR /home/user
COPY run.sh flag.txt ./
RUN chown user: flag.txt &&\
  chmod 400 flag.txt &&\
  chown user: /home/user/ &&\
  chmod 700 /home/user
# Copies end

FROM gcr.io/kctf-docker/challenge@sha256:d884e54146b71baf91603d5b73e563eaffc5a42d494b1e32341a5f76363060fb

COPY --from=chroot / /chroot
RUN cd /chroot/dev && \
  touch null zero urandom random full

COPY nsjail.cfg /home/user/
COPY subuid subgid /etc/

CMD kctf_setup && \
    kctf_drop_privs \
    socat \
      TCP-LISTEN:1337,reuseaddr,fork \
      EXEC:"kctf_pow nsjail --config /home/user/nsjail.cfg -- /home/user/run.sh",pty,setsid,sigint,sane

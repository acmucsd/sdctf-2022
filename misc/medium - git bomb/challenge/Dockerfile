FROM node:lts-alpine AS base
WORKDIR /app
COPY package.json .
COPY package-lock.json .

FROM base AS dependencies
RUN npm set progress=false && npm config set depth 0
RUN npm install

FROM ubuntu:20.04 as chroot
RUN /usr/sbin/useradd -u 1000 user

RUN apt-get update \
    && apt-get install -yq --no-install-recommends \
       curl ca-certificates socat gnupg lsb-release git \
    && curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get install -yq --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY index.js .
COPY run.sh .
COPY gcaas.sh .

COPY .gitconfig /etc/gitconfig
COPY flag /flag

FROM gcr.io/kctf-docker/challenge@sha256:d884e54146b71baf91603d5b73e563eaffc5a42d494b1e32341a5f76363060fb as prod_env

FROM prod_env
COPY --from=chroot / /chroot
COPY web-servers.nsjail.cfg /home/user/web-servers.nsjail.cfg

CMD kctf_setup \
    && kctf_drop_privs nsjail --config /home/user/web-servers.nsjail.cfg --port 1337 -- /app/run.sh
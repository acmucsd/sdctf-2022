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
FROM gcr.io/kctf-docker/challenge@sha256:d884e54146b71baf91603d5b73e563eaffc5a42d494b1e32341a5f76363060fb as prod_env

RUN apt-get update \
    && apt-get install -yq --no-install-recommends \
       curl ca-certificates socat gnupg lsb-release \
    && curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get install -yq --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*
#RUN wget https://repo.mongodb.org/apt/ubuntu/dists/focal/mongodb-org/4.4/multiverse/binary-amd64/mongodb-org-server_4.4.13_amd64.deb
RUN wget https://repo.mongodb.org/apt/ubuntu/dists/focal/mongodb-org/5.0/multiverse/binary-amd64/mongodb-org-server_5.0.8_amd64.deb
RUN wget https://repo.mongodb.org/apt/ubuntu/dists/focal/mongodb-org/5.0/multiverse/binary-amd64/mongodb-org-shell_5.0.8_amd64.deb
RUN truncate -s0 /tmp/preseed.cfg && \
       (echo "tzdata tzdata/Areas select America" >> /tmp/preseed.cfg) && \
       (echo "tzdata tzdata/Zones/America select Los_Angeles" >> /tmp/preseed.cfg) && \
       debconf-set-selections /tmp/preseed.cfg && \
       rm -f /etc/timezone /etc/localtime && \
       apt-get update && \
       DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true \
       apt-get install -y tzdata
   ## cleanup of files from setup
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN dpkg -i ./mongodb-org-server_5.0.8_amd64.deb
RUN dpkg -i ./mongodb-org-shell_5.0.8_amd64.deb
RUN apt-get install -f
RUN mkdir -p /data/db

FROM node:16-bullseye as deps
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm set progress=false && npm config set depth 0
RUN npm install 

FROM node:lts-alpine as builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build-linux

FROM prod_env
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# useful for mongodb to run
CMD (mount -t tmpfs tmpfs /tmp &) \
    && (mount -t tmpfs tmpfs /data/db) \
    && (kctf_setup && cd /app) \
    && (mongod > /dev/null 2> /dev/null &) \
    && (kctf_drop_privs node /app/build/index.js &) \
    && (kctf_drop_privs node /app/build/discordbot.js)
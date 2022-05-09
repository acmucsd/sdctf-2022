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
    && apt-get install python3 -yq --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

FROM node:16-bullseye as deps
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm set progress=false && npm config set depth 0
#RUN apk add python3 make gcc g++
RUN npm install 

FROM node:lts-alpine as builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build-linux
RUN cp /app/challenge.db build/

FROM prod_env
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD kctf_setup && cd /app && kctf_drop_privs node /app/build/index.js
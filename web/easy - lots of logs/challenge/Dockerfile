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
    && rm -rf /var/lib/apt/lists/* \
    && apt-get install socat -y --no-install-recommends

FROM node:alpine as deps
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
RUN tar -xf build/public/logs.tar -C build/public
RUN rm -rf build/public/logs.tar

RUN touch script.sh
RUN echo '#!/bin/bash' >> script.sh
RUN echo 'echo -n "Pass: "' >> script.sh
RUN echo 'read -r line' >> script.sh
RUN echo 'if [[ $line = "82d192aa35a6298997e9456cb3a0b5dd92e4d6411c56af2169bed167b53f38d" ]]; then' >> script.sh
RUN echo 'echo "sdctf{b3tr4y3d_by_th3_l0gs_8a4dfd}"' >> script.sh
RUN echo 'fi' >> script.sh
RUN echo 'exit 0' >> script.sh
RUN chmod +x script.sh

FROM prod_env
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/script.sh /app/script.sh
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD kctf_setup && cd /app && \
    (kctf_drop_privs socat -T 120 TCP-LISTEN:1338,fork,reuseaddr EXEC:/app/script.sh &) && \
    kctf_drop_privs node /app/build/index.js

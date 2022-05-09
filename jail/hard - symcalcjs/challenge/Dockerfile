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
# we need the latest possible node due to await / import usage
RUN apt-get update \
    && apt-get install -yq --no-install-recommends \
       curl ca-certificates socat gnupg lsb-release \
    && curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get install -yq --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*
RUN /usr/sbin/useradd --no-create-home -u 1000 user
COPY server.mjs /home/user/

FROM gcr.io/kctf-docker/challenge@sha256:d884e54146b71baf91603d5b73e563eaffc5a42d494b1e32341a5f76363060fb
COPY --from=chroot / /chroot
COPY nsjail.cfg /home/user/
CMD kctf_setup && \
    kctf_drop_privs \
    socat \
      TCP-LISTEN:1337,reuseaddr,fork \
      EXEC:"kctf_pow nsjail --config /home/user/nsjail.cfg -- /bin/node /home/user/server.mjs"
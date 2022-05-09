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

import requests

r = requests.post('http://localhost:1337/api/rocketLaunch', json={'rocket': 'triton', 'launchTime': '12:00', 'pumpID': 4, 'token': 'yiLYDykacWp9sgPMluQeKkANeRFXyU3ZuxBrj2BQ'})

if r.text == "rocket launched. sdctf{0ne_sM@lL_sT3p_f0R_h@ck3r$}":
    print('passed health check')
    exit(0)

exit(1)

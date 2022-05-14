# CURL Up and Read
## WEB - Hard
| author | first blood | solves | points |
| --- | --- | --- | --- |
| Aaron James | _ | 0 | 0 |
### prompt
This app will show the reader view of any website you enter! No more ads, cookie nags, and paywalls, just content. https://curl.sdc.tf 

### original specification
The app downloads webpages not through traditional request libraries or even a chrome robot, but by calling CURL to download the webpage, then showing the page using https://github.com/mozilla/readability. The key is that user input is fed to CURL directly, but rather than being a simple bash escape, input is indeed passed through a JSONSchema spec for a URI formatted string, so a bash escape isn't possible, only https://example.com/ urls are allowed...only there's a bug in JSONSchema such that this https://json-schema.org/understanding-json-schema/reference/string.html#uri-template will also allow any URI formatted string rather than just URLs...which CURL supports tons of with no additional configuration. This can be abused to obtain local file inclusion with file:///etc/shadow paths, or even obtain environment variables of the parent process via file:///proc/self/environ...

**flag:** `sdctf{CURL_up_aNd_L0c@L_F1le_incLuSi0N}`

### write-ups
1. https://github.com/BYU-CTF-group/writeups/tree/main/SDCTF_2022/curl-up-and-read
2. https://gist.github.com/DauHoangTai/6669efd86c3c484c355eca708a44399b#file-curlup-py
3. https://sheeptester.github.io/longer-tweets/ctf/#curl-get-environment-variable-ctf
# Mann Hunt
## OSINT - Hard
| author | first blood | solves | points |
| --- | --- | --- | --- |
| Aaron James | _ | 0 | 0 |
### prompt
We were on the trail of a notorious hacker earlier this week, but they suddenly went dark, taking down all of their internet presence...All we have is a username: `mann5549`

We need you to track down their personal email address! It will be in the form `****.sdctf@gmail.com`. Once you find it, send them an email to demand the flag!

### original specification
Multi-step sleuthing! Have the username exist on some Twitter where all of the content (including the profile picture) has been deleted. The player needs to use the Wayback machine to retrieve a version of the page that contains a link to a blog, mann.codes. The blog has been wiped, but still contains a link in the meta “description” header back to the github repo its deployed from, and by looking at the git history of the website, you can find the full (fake) name: Emanuel Hunt. Once you have a name, you can look them up to find a LinkedIn profile. On their attached resume is a contact email that has been configured with an auto responder that gives the flag. 

**flag:** `sdctf{MaNN_tH@t_w@s_Ann0YinG}`

### write-ups

1. https://bashcrash3rs.github.io/SDCTF-2022-Mann-Hunt
2. https://github.com/bhavya-error404/CTFs-Writeups/blob/main/SDCTF/OSINT/Mann-hunt.md
3. https://docs.google.com/document/d/1TskY2gMi_DlmkfEFkZeje1TmkWPfhNF9h13dzKCgF2g/edit
4. https://github.com/thewhitecircle/ctf_writeups/blob/main/sdctf_2022/osint.md#mann-hunt
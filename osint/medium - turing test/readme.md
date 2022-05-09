# Turing Test
## OSINT - Medium
| author | first blood | solves | points |
| --- | --- | --- | --- |
| Aaron James, Andy Peterson | _ | 0 | 0 |
### prompt
My friend has been locked out of his account on http://flag-vault.sdc.tf! 

Can you help him recover it? His email is `jack.sdctf@gmail.com`.

### original specification
Create a simple website with a login portal. You can use the email to get to a Login Failed page with a “recover password” button in the bottom right corner. Clicking it pulls up a fake customer service style dialogue that will ask various questions to “confirm” their identity. 

The dialogue will start by asking for the user’s full name, saying the name is “J*** B*****”. You can use the account’s email to search the user on Facebook, which is entirely public. Obviously, you’ll be able to give the full name: “Jack Banner”.

Next, it asks for your birthday. This isn’t public on the Facebook page, but on the timeline, there’s a cheesy photo of Jack sitting in front of a birthday cake, with clues leading to the exact date. Next, it asks the “security question”, what your pet dog’s name is. This information isn’t on the page, but this Facebook account links to an Instagram account for a dog called “Ravioli”. 

Lastly, the portal asks “We have one flag recorded in your account called “CTF_FLAG”. Can you tell us the first 6 characters of the flag?” Obviously, the answer is just sdctf{.

After, the account is unlocked and the user can get the flag from the flag vault website.

**flag:** `sdctf{7he_1m1747i0n_94m3}`


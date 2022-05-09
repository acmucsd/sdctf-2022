# HuMongous Mistake
## WEB - Medium
| author | first blood | solves | points |
| --- | --- | --- | --- |
| Nick Petrone | _ | 0 | 0 |
### prompt
Come purchase some shells! People are saying our payment server is acting a bit finnicky lately, but I don’t know what they’re talking about. It works fine on my end!

https://shell.sdc.tf

### original specification
Navigate to the login page to create an account with your discord name but don’t use the 2fa token that’s generated for you. Open a separate browser window and login with the username admin but for the password edit the request body so the password parameter looks like this: password[%24ne]=anystring&password[length]=anystring. Then use the two factor authentication code sent to you via discord to bypass admin 2fa since 2fa tokens are not checked for whether they belong to an account when they’re being verified. Now that you have an admin session token, you can go to the shop page and buy the flag shell to get the flag.

**flag:** `sdctf{th1s_ch4ll3nge_1snt_g3tt1ng_a_SQL_ad45bd}`


# Lots of Logs
## WEB - Easy
| author | first blood | solves | points |
| --- | --- | --- | --- |
| Nick Petrone | _ | 0 | 0 |
### prompt
As a professional logger, I made an extensive logger that logs all of the logs I log to the blog I blog so that no log goes unlogged. I post some logs to the catalog on my blog.

https://logs.sdc.tf

### original specification
A simple website that aggregates links to log files. Logs are hosted in a path in the form YYYY/MM/DD/Day.log where Day is an abbreviated day of the week (”Mon”, ”Tue”, etc.). By following this pattern by accessing logs into the past, there are 3 days that are missing their logs in June of 2018, in which the day immediately after, there is a log that captures a person exploiting the logging server and deleting said files. Viewing this log shows them installing a backdoor on a port with a password. Running netcat on this port and providing the password gets you entry and thus the flag.

**flag:** `sdctf{b3tr4y3d_by_th3_l0gs_8a4dfd}`


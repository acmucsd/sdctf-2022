# Gullible by Dovesign
## WEB - Medium
| author | first blood | solves | points |
| --- | --- | --- | --- |
| Nick Petrone | _ | 0 | 0 |
### prompt
I really like birds, so I made a website where people can upload their favorite bird pictures. It’s protected by state-of-the-art anti-bird prevention technology, so don’t bother trying to upload anything that isn’t a bird. Have fun birding!

https://dove.sdc.tf

### original specification
User creates account and logs into website, uploads a picture of a bird, the image description EXIF tag is used to perform an unfiltered SQL query in the form of SELECT name FROM birds WHERE name LIKE '$IMAGE_DESCRIPTION%' to "identify" the bird, and the result is sent back to the user. Images on the page will have their descriptions set to the bird name. The raw output of whatever SQL injected query they make should be outputted to the web-app so it isn't a blind injection, however  specific errors are hidden. There will be images of birds on the website that will have their EXIF image descriptions set to a type of bird species. Challenge is solved by performing a cross table query to the employee_accts table and getting the user dlepage’s password. This can be done by querying the master table and finding the table name by changing the order of the columns. Since only one field is visible, you essentially have to design your query in a way that moves the table around to view specific entries by changing column order and getting different rows. 

**flag:** `sdctf{th3_e4r1y_b1rd_n3rd_g3t5_the_fl4g_a1e45fb4}`


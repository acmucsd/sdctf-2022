kctf_setup 
cd /app
mongod &
kctf_drop_privs node /app/build/index.js &
kctf_drop_privs node /app/build/discordbot.js &
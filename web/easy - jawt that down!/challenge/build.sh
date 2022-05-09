ln -s $(pwd) /tmp/jawtbuild
cd /tmp/jawtbuild
webpack & tsc
cd /
rm -rf /tmp/jawtbuild
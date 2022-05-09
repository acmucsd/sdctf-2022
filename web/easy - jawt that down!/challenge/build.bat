@echo off
subst /d M:
subst M: "%cd%"
M:
call tsc
@echo on
call webpack 
subst /d M:
time /T
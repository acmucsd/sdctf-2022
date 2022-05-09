# **** Debugging utilities
show_num = $(if $1,$\
	$(if $(call has_underflow,$1),NEGATIVE,$(foreach unary_rep,$1,$(call unary2num,$(call unpad,$(unary_rep))))),0)
# **** Debugging utilities end

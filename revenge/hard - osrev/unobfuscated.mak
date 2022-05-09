# Numbers
U:=0
UI:=1
UII:=2
UIII:=3
UIIII:=4
UIIIII:=5
UIIIIII:=6
UIIIIIII:=7
UIIIIIIII:=8
UIIIIIIIII:=9
UIIIIIIIIII:=a
UIIIIIIIIIII:=b
UIIIIIIIIIIII:=c

# Complements (used for subtraction)
C:=IIIIIIIIIIIII
CI:=IIIIIIIIIIII
CII:=IIIIIIIIIII
CIII:=IIIIIIIIII
CIIII:=IIIIIIIII
CIIIII:=IIIIIIII
CIIIIII:=IIIIIII
CIIIIIII:=IIIIII
CIIIIIIII:=IIIII
CIIIIIIIII:=IIII
CIIIIIIIIII:=III
CIIIIIIIIIII:=II
CIIIIIIIIIIII:=I
CIIIIIIIIIIIII:=

unary_table:=I II III IIII IIIII IIIIII IIIIIII IIIIIIII IIIIIIIII 
base_unary:=IIIIIIIIIIIII
valid_digits:=0 1 2 3 4 5 6 7 8 9 a b c
special_digits:=0 a b c

# Special digits table
S_0:=
S_a:=IIIIIIIIII
S_b:=IIIIIIIIIII
S_c:=IIIIIIIIIIII

num2unary = $(if $(filter $1,$(valid_digits)),$(if $(filter $1,$(special_digits)),$(S_$1),$(word $1, $(unary_table))),$(report_parse_error))

N1 := 1618a9775112957a1ab9663590a43c38712c5cb862c238cc45195131c39363b93283b6ac5acb06a914c6955b209a021a82687884b64c12cc229a1ab89b23615338b6b43088299998b548916570025b1ab2611009c31c03ccc07c0485b3936748ab31b920c66c333c03349634742925bca
N2 := 17575769932901767201cb252628b134bb9c35517913c499314b532287859066b5a051a2bc314bcc8860bc125a0884ca552480176b9118aa1826016bb8c1b012180a5a80b392c5a7546454056c4274280a6a56b379b0bb974757378995ca7a789a3b637a87638436cbb48c8258b272742

# ------------- Begin base-independent calc -------------

report_parse_error = $(error Invalid build key format!)
invalid_key = $(error Invalid build key!)

# ***** Misc utilities
# Invert a boolean
not = $(if $1,,A)
# Get all except the last word of $1
rev_tail = $(wordlist 2,$(words $1),A $1)
# Get all except the first word of $1
tail = $(wordlist 2,$(words $1),$1)
# **** Misc utilities end

pad = U$1
unpad = $(subst U,,$1)

unary2num = $(U$1)
complement_unary = $(C$1)

# Single digit addition (full-adder) utils
# $(call has_carry,$(call add_unary $A$B)) -> carry bit of A + B
# $(call mod_base,$(call add_unary $A$B)) -> sum of A + B mod 10
add_unary = $(subst $(base_unary),C,$1)
has_carry = $(subst I,,$1)
mod_base = $(subst C,,$1)

# Single digit Full-subtracter utils
sub_unary = $(call add_unary,$1$(call complement_unary,$2))
sub_padded_unary = $(call sub_unary,$(call unpad,$1),$(call unpad,$2))

# 123 -> 1 2 3
parse_num = $(call validate_num,$1)$(call parse_num_helper,$1,$(valid_digits))
parse_num_helper = $(if $2,$(call parse_num_helper,$(subst $(firstword $2),$(call pad,$(call num2unary,$(firstword $2))) ,$1),$(call tail,$2)),$1)
validate_num = $(if $(call validate_num_helper,$1,$(valid_digits)),$(report_parse_error),)
validate_num_helper = $(if $2,$(call validate_num_helper,$(subst $(firstword $2),,$1),$(call tail,$2)),$1)

# Strip leading zeros
strip_zeros = $(if $1,$(if $(call unpad,$(firstword $1)),$1,$(call strip_zeros,$(call tail,$1))),)

# Big integer subtraction
big_sub = $(call strip_zeros,$(call big_sub_helper,$(call strip_zeros,$1),$(call strip_zeros,$2),))
# DEBUG append: $(shell echo big_sub_helper l1:\"$1\" l2:\"$2\" b:\"$3\" > /dev/stderr)
big_sub_helper = $(if $1,$\
	$(call let_big_sub_helper,$\
		$(call rev_tail,$1),$\
		$(call rev_tail,$2),$\
		$(call sub_padded_unary,$(lastword $1),$(lastword $2)$3)),$\
	$(if $(or $2,$3),X,U))

# Check the return value of big_sub to see if the result underflows (negative)
has_underflow = $(filter $1,X)

# $1 = ds
# $2 = ss
# $3 = dsub
let_big_sub_helper = $(call big_sub_helper,$1,$2,$(if $(call has_carry,$3),,I)) $(call pad,$(call mod_base,$3))

big_mod = $(call strip_zeros,$(call big_mod_helper,,$1,$2))
big_mod_helper = $(if $2,$(call big_mod_helper,$(call simple_mod,$1 $(firstword $2),$3),$(call tail,$2),$3),$1)

simple_mod = $(call let_simple_mod,$1,$2,$(call big_sub,$1,$2))
let_simple_mod = $(if $(call has_underflow,$3),$1,$(call simple_mod,$3,$2))

# **** Make rules *****

N1_UNARY := $(call parse_num,$(N1))
N2_UNARY := $(call parse_num,$(N2))

ACCEPT := echo Accepted build key, making program now
WAIT = $(shell echo Validating key, please wait. This process can take a minute or so depending on the length of your provided build key... >&2)

verify_number_key = $(WAIT) $(if $(filter $(firstword $1),U),$(invalid_key),) $(if $\
	$(call has_underflow,$(call big_sub,$1,UII)),$\
	$(invalid_key),$\
	$(if $(or $(call big_mod,$(N1_UNARY),$1),$(call big_mod,$(N2_UNARY),$1)),$(invalid_key),$(ACCEPT)))
verify_key = $(if $1,$(call verify_number_key,$(call parse_num,$1)),$(error Usage: "make BUILD_KEY=<replace with your build key>"))

program: program.c
	$(eval KEY := $(BUILD_KEY))
	$(call verify_key,$(KEY))
	gcc -DKEY=$(firstword $(shell echo -n $(KEY) | sha256sum)) program.c -o program

clean:
	rm -f program

.PHONY: clean

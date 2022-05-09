# Do not make this available for download.

class UnreadableString(str):
    def __repr__(self) -> str:
        return "REDACTED"
    def __str__(self) -> str:
        return "REDACTED"

class Flag1Holder:
    def __init__(self, flag1: str):
        setattr(self, '-flag1-', UnreadableString(flag1))

def get_flag1():
    with open('flag1.txt') as f1:
        return Flag1Holder(f1.read())

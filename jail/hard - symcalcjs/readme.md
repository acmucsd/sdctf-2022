# SymCalcjs
## JAIL - Hard
| author | first blood | solves | points |
| --- | --- | --- | --- |
| k3v1n | fredd (thehackerscrew) | 0 | 0 |
### prompt
We ported our state-of-the-art calculator to Node.js because we were tired of Python's security issues...

### original specification
We explicitly allow the following characters:
- alphanumeric
- `+, -, /, *` (operations)
- `=, <, >` (for comparisons)
- `[, ]` (for doing stuff with arrays)
- `(, )` (for operation precedence)

In other words, we explicitly ban the following:
- `.` (no accessing children)
- `!` (would literally enable JSfuck lol)
- No quotes of any kind

In addition, we run everything through the standard node module `vm`.

There are two stages to this challenge, first you need to bypass the character restrictions to be able to write whatever you want, and secondly, you need to break from the child process jail. 

The first stage can be done with the following:
`let source = String(/s/)[1] + String(/o/)[1] + String(/u/)[1] + String(/r/)[1] + String(/c/)[1] + String(/e/)[1]`

After which, you can create arbitrary strings with `/string/[source]` and access arbitrary children with `console[/log/[source]]`
Functions can also still be written with anonymous functions, which don't require curly braces: `() ⇒ result`

Next, you need to create an exploit to escape the vm, of which the simplest solution is this.constructor.constructor(”return process.env.FLAG”)(), but with the character restriction, this will be tricky to pull off...

**flag:** `sdctf{JaVaScriPT_SynTAX_Is_ADmirab1e}`


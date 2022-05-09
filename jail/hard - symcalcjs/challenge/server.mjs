import readline from 'readline';
import vm from 'vm';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const question = (query) => new Promise(resolve => rl.question(query, resolve));

const context = vm.createContext(
    // we make sure to pass in the NOTHING as the context (no library functions or process.env.FLAG)
    {},
    // and we make sure to disallow code generation of any kind
    { codeGeneration: { strings: false, wasm: false } }
);

// infinite REPL
console.log('Welcome to SymCalc.js, for all your math needs');
while(1) {
    const code = await question('> ');

    // don't allow characters that a calculator doesn't need!
    if (/[^\w\d\s+\-/*=<>\[\]()]/.test(code)) {
        console.log('Please do not use any illegal characters.');
        continue;
    }

    try {
        const result = vm.runInContext(code, context, { timeout: 3000 });
        console.log(result + '');
    } catch (e) {
        console.log(e + '');
    }
}

rl.close();
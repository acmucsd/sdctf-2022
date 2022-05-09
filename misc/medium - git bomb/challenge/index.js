const express = require('express');
const formidable = require('formidable');
const spawn = require('child_process').spawn;
const app = express();
const PORT = process.env.PORT || 6665;

app.get('/', (req, res, next) => {
    res.send(':)');
});

app.post('/', (req, res, next) => {
  const form = formidable({});

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    res.type('text/plain');
    const repo = files.repo;
    if (repo === undefined) {
      res.status(400).send('Bad request. Check for typos in your command.');
      return;
    }
    let stdout = '';
    let stderr = '';
    const proc = spawn(__dirname + '/gcaas.sh', [repo.filepath]);
    proc.stdout.on('data', data => stdout += data.toString());
    proc.stderr.on('data', data => stderr += data.toString());
    proc.on('exit', () => res.send(`Standard output:\n${stdout}\nStandard error:\n${stderr}`));
  });
});

app.use('*', (req, res) => {
  res.status(404).send('Not Found. Check for typos in your command.');
});

app.listen(PORT, () => {
  console.log(`Test locally:\ncurl -F 'repo=@/path/to/your/git/repo.tar.gz' http://localhost:${PORT}/`);
});

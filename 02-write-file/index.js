const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {  stdin: input, stdout: output } = process;

const rl = readline.createInterface({ input, output });

fs.writeFile(
  path.join(__dirname, './', 'text.txt'),
  '',
  (err) => {
    if (err) throw err;
  }
);

input.write('Write something please:\n');

rl.on('line', (input) => {
  if(input === 'exit') {
    rl.close();
    output.write(
      'Thank you! Good bye!'
    );
  } else {
    fs.appendFile(
      path.join(__dirname, './', 'text.txt'),
      `${input}\n`,
      err => {
        if (err) throw err;
      }
    );
  }
});

process.on('exit', () => {
  rl.close();
  output.write(
    'Thank you! Good bye!'
  );
});

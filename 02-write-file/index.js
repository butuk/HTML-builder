const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {  stdin: input, stdout: output } = process;

const rl = readline.createInterface({ input, output });
const filePath = path.join(__dirname, './', 'text.txt');
const stream = fs.createWriteStream(filePath, 'utf-8');

input.write('Write something please:\n');

rl.on('line', (input) => {
  if(input === 'exit') {
    rl.close();
  } else {
    stream.write(`${input}\n`);
    stream.on('error', error => console.log('Error', error.message));
  }
});

rl.on('error', error => console.log('Error', error.message));

process.on('exit', () => {
  output.write(
    'Thank you! Good bye!'
  );
});

process.on('error', error => console.log('Error', error.message));

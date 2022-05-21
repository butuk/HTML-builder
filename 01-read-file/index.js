// const fs = require('fs');
// const path = require('path');

const { stdin, stdout } = process;

stdin.on('data', data => {
  stdout.write(data);
  process.exit();
});

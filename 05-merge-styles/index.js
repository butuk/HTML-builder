const fs = require('fs');
const { Transform } = require('stream');
const path = require('path');
const folderPath = path.join(__dirname, './styles');
const destinationPath = path.join(__dirname, './project-dist', 'bundle.css');
const { readdir } = require('fs/promises');

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk);
    callback();
  }
});

async function makeCss() {
  const files = await readdir(folderPath);
  await files.forEach(file => {
    const fileExt = path.extname(file).slice(1);
    if(fileExt === 'css') {
      const filePath = path.join(folderPath, file);
      const readStream = fs.createReadStream(filePath, 'utf-8');
      const writeStream = fs.createWriteStream(destinationPath);
      readStream
        .pipe(transformStream)
        .on('error', err => console.log(err))
        .pipe(writeStream)
        .on('error', err => console.log(err));
    }
  });
}

(async () => {
  try {
    await makeCss();
  } catch (error) {
    console.log(error);
  }
})();
const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');
const folderPath = path.join(__dirname, './secret-folder');

async function ReadFiles() {
  const files = await readdir(folderPath);
  await files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    fs.stat(filePath, (err, stats) => {
      if(stats.isFile()) {
        const fileSize = stats.size/1024;
        const fileName = file.split('.')[0];
        const fileExt = path.extname(file).slice(1);
        console.log(`${fileName} - ${fileExt} - ${fileSize}kb`);
      }
    });
  });
}

(async () => {
  try {
    await ReadFiles();
  } catch (error) {
    console.log(error);
  }
})();

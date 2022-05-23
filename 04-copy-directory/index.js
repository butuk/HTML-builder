const path = require('path');
const folderPath = path.join(__dirname, './files');
const newFolderPath = path.join(__dirname, './files-copy');
const { unlink } = require('fs');
const { mkdir, readdir, copyFile } = require('fs/promises');

async function copyDir() {
  await mkdir(newFolderPath, {recursive: true});
  const oldFiles = await readdir(newFolderPath);
  await oldFiles.forEach(file => {
    const oldFilePath = path.join(newFolderPath, file);
    unlink(oldFilePath, err => {
      if(err) throw err;
    });
  });
  const files = await readdir(folderPath);
  await files.forEach(file => {
    const filePath = path.join(folderPath, file);
    const newFilePath = path.join(newFolderPath, file);
    copyFile(filePath, newFilePath);
  });
  console.log('Folder is synced (or created and sync)!');
}

(async () => {
  try {
    await copyDir();
  } catch (error) {
    console.log(error);
  }
})();
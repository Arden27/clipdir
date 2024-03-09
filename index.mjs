#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import clipboardy from 'clipboardy';

function packFiles(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Could not list the directory.', err);
      process.exit(1);
    }

    let packedContent = '';

    files.forEach((file, index) => {
      const filePath = path.join(directory, file);
      if (fs.lstatSync(filePath).isFile()) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        packedContent += `// ${file}:\n\n${fileContent}\n\n`;
      }
    });

    clipboardy.writeSync(packedContent);
    console.log('Files have been packed and copied to clipboard!');
  });
}

// Get the directory from the command line arguments
const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Please provide a directory path.');
  process.exit(1);
}

const folderPath = path.resolve(process.cwd(), args[0]);
packFiles(folderPath);

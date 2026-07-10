const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(file => {
      const dirFile = path.join(dir, file);
      try {
        filelist = walkSync(dirFile, filelist);
      } catch (err) {
        if (err.code === 'ENOTDIR' || err.code === 'EBADF') {
          if (dirFile.endsWith('.js') || dirFile.endsWith('.jsx')) {
            filelist.push(dirFile);
          }
        } else {
          throw err;
        }
      }
    });
  }
  return filelist;
};

const dirs = [
  path.join(__dirname, 'Frontend', 'src'),
  path.join(__dirname, 'admin', 'src')
];

let files = [];
dirs.forEach(dir => {
  files = walkSync(dir, files);
});

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace single quoted 'http://localhost:5000...'
  if (content.includes("'http://localhost:5000")) {
    content = content.replace(/'http:\/\/localhost:5000(.*?)'/g, "import.meta.env.VITE_API_URL + '$1'");
    changed = true;
  }

  // Replace backticked `http://localhost:5000...`
  if (content.includes("`http://localhost:5000")) {
    content = content.replace(/`http:\/\/localhost:5000(.*?)`/g, "`${import.meta.env.VITE_API_URL}$1`");
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});

console.log('Done.');

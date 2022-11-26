directoryContents = fs.readdirSync(__dirname);
folders = [];
files = [];

for (let i = 0; i < directoryContents.length; i++) {
    let file = __dirname + '/' + directoryContents[i];
    let stats = fs.statSync(file);
    if (stats.isDirectory()) {
        folders.push(directoryContents[i]);
    } else {
        files.push(directoryContents[i]);
    }
}

console.log(folders);
console.log(files); 
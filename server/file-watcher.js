const { readdirSync } = require("fs");
var watch = require("node-watch");

class FileWatcher {
  watchFolder(directoryToWatch, options, callBackFn) {
    const initFileList = this._getFileList(directoryToWatch, options);
    console.log(initFileList);
    initFileList.forEach((filepath) => {
      callBackFn(filepath);
    });

    watch(directoryToWatch, { recursive: true }, function (evt, name) {
      console.log("%s changed.", name);
      callBackFn(name);
    });
  }

  _getFileList = (dirName) => {
    let files = [];
    const items = readdirSync(dirName, { withFileTypes: true });

    for (const item of items) {
      if (item.isDirectory()) {
        files = [...files, ...ths._getFileList(`${dirName}/${item.name}`)];
      } else {
        files.push(`${dirName}/${item.name}`);
      }
    }

    return files;
  };
}

module.exports = {
  FileWatcher: FileWatcher,
};

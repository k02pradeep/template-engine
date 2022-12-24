var getDirName = require("path").dirname;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");

const { TemplateEngine } = require("../template-engine");
const { FileWatcher } = require("./file-watcher");

const fileWriteOptions = {
  encoding: "utf8",
  flag: "w",
  mode: 0o666,
};

class TemplateProcesser {
  templateEngine;

  init(directoryName) {
    this.templateEngine = new TemplateEngine();
    const fileWatcher = new FileWatcher();
    fileWatcher.watchFolder(directoryName, {}, (fileName) => {
      this.processFile(fileName);
    });
  }

  processFile(fileName) {
    JSDOM.fromFile(fileName, {}).then((dom) => {
      // console.log(dom);
      console.log(dom.window.document.body);
      const jsonObj = this.templateEngine.parseXml(
        dom.window.document.body.childNodes[0]
      );
      console.log(jsonObj);
      const htmlStr = this.templateEngine.renderHtml(jsonObj);
      console.log(htmlStr);
      // writeFileSyncRecursive(path.join('output', name), htmlStr3, 'utf8');
      TemplateProcesser.writeFile(
        "./output/" + fileName,
        htmlStr,
        fileWriteOptions,
        function (err) {
          console.log(err);
        }
      );
    });
  }

  static writeFile(path, contents, options, cb) {
    fs.mkdir(getDirName(path), { recursive: true }, function (err) {
      if (err) return cb(err);

      fs.writeFile(path, contents, options, cb);
    });
  }
}

module.exports = {
  TemplateProcesser: TemplateProcesser,
};

/*
  
  function writeFileSyncRecursive(filename, content, charset) {
    const folders = filename.split(path.sep).slice(0, -1);
    if (folders.length) {
      // create folder path if it doesn't exist
      folders.reduce((last, folder) => {
        const folderPath = last ? last + path.sep + folder : folder;
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath);
        }
        return folderPath;
      });
    }
    fs.writeFileSync(filename, content, charset);
  }
  */

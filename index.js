// run `node index.js` in the terminal

console.log(`Hello Node.js v${process.versions.node}!`);

const fs = require('fs');
const path = require('path');
var watch = require('node-watch');
var DomParser = require('dom-parser');
var parser = new DomParser();

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { TemplateEngine, TagRegistry } = require('./template-engine');
console.log(TemplateEngine);
const templateEngine = new TemplateEngine();
const { AnyTag } = require('./tags/any.tag');
const { PageTag } = require('./tags/page.tag');
const { DataLabelTag } = require('./tags/data-label.tag');
console.log(AnyTag);
TagRegistry.registerTag(AnyTag);
TagRegistry.registerTag(PageTag);
TagRegistry.registerTag(DataLabelTag);

watch('templates', { recursive: true }, function (evt, name) {
  console.log('%s changed.', name);
  /*fs.readFile(name, 'utf8', function (err, data) {
    var xml = parser.parseFromString(data);
    console.log(xml);
  });*/
  JSDOM.fromFile(name, {}).then((dom) => {
    // console.log(dom);
    console.log(dom.window.document.body);
    const jsonObj3 = templateEngine.parseXml(
      dom.window.document.body.childNodes[0]
    );
    console.log(jsonObj3);
    const htmlStr3 = templateEngine.renderHtml(jsonObj3);
    console.log(htmlStr3);
    // writeFileSyncRecursive(path.join('output', name), htmlStr3, 'utf8');
    writeFile(
      './output/' + name,
      htmlStr3,
      {
        encoding: 'utf8',
        flag: 'w',
        mode: 0o666,
      },
      function (err) {
        console.log(err);
      }
    );
  });
});

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

var getDirName = require('path').dirname;

function writeFile(path, contents, options, cb) {
  fs.mkdir(getDirName(path), { recursive: true }, function (err) {
    if (err) return cb(err);

    fs.writeFile(path, contents, options, cb);
  });
}

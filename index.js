// run `node index.js` in the terminal

console.log(`Hello Node.js v${process.versions.node}!`);

const { TagProcesser, TemplateProcesser } = require('./server');

const tagProcesser = new TagProcesser();
tagProcesser.init('tags');

const templateProcesser = new TemplateProcesser();
templateProcesser.init('templates');

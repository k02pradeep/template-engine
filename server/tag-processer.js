const { TagRegistry } = require("../template-engine");
const { FileWatcher } = require("./file-watcher");

class TagProcesser {
  init(directoryName) {
    const fileWatcher = new FileWatcher();
    fileWatcher.watchFolder(directoryName, {}, (fileName) => {
      const tag = require("../" + fileName);
      console.log(tag);
      TagRegistry.registerTag(tag);
    });
  }
}

module.exports = {
  TagProcesser: TagProcesser,
};

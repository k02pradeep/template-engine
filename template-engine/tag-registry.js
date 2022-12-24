class TagRegistry {
  static tagRegistry = {};

  static registerTag(tagDetails) {
    TagRegistry.tagRegistry[tagDetails.tagName] = tagDetails;
  }

  static getTagDetails(tagName) {
    return TagRegistry.tagRegistry[tagName.toLowerCase()];
  }

  static getAnytagDetails() {
    return TagRegistry.tagRegistry[''];
  }
}

module.exports = {
  TagRegistry: TagRegistry,
};

const { camelCase } = require('lodash');
const { TagRegistry } = require('./tag-registry');

const NodeTypes = {
  ELEMENT_NODE: 1,
  ATTRIBUTE_NODE: 2,
  TEXT_NODE: 3,
  CDATA_SECTION_NODE: 4,
  ENTITY_REFERENCE_NODE: 5,
  ENTITY_NODE: 6,
  PROCESSING_INSTRUCTION_NODE: 7,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9,
  DOCUMENT_TYPE_NODE: 10,
  DOCUMENT_FRAGMENT_NODE: 11,
  NOTATION_NODE: 12,
};

class TemplateEngine {
  parseXml(xmlDoc) {
    if (xmlDoc.nodeType === NodeTypes.ELEMENT_NODE) {
      const jsObj = {
        name: xmlDoc.tagName,
        attributes: {},
        children: [],
        content: {},
      };
      const attrNames = xmlDoc.getAttributeNames();
      for (let attr = 0; attr < attrNames.length; attr++) {
        jsObj.attributes[attrNames[attr]] = xmlDoc.getAttribute(
          attrNames[attr]
        );
      }
      const tagProcessor = TagRegistry.getTagDetails(xmlDoc.tagName);
      if (tagProcessor && tagProcessor.content === 'fixed') {
        let childObj;
        xmlDoc.childNodes.forEach((childNode) => {
          childObj = this.parseXml(childNode);
          if (childObj.name) {
            jsObj.content[camelCase(childNode.tagName)] =
              this.parseXml(childNode);
          }
        });
      } else {
        let childObj;
        for (let i = 0; i < xmlDoc.childNodes.length; i++) {
          childObj = this.parseXml(xmlDoc.childNodes[i]);
          if (childObj.name) {
            jsObj.children.push(childObj);
          }
        }
      }
      return jsObj;
    } else {
      return {};
    }
  }

  renderHtml(jsonObj) {
    let htmlStrContent = '';

    jsonObj.children.forEach((child) => {
      htmlStrContent += this.renderHtml(child);
    });
    let htmlContent = {};
    for (let ctx in jsonObj.content) {
      htmlContent[ctx] = this.renderHtml(jsonObj.content[ctx]);
    }

    const tagRenderer = TagRegistry.getTagDetails(jsonObj.name);
    if (tagRenderer) {
      return tagRenderer.renderTag(jsonObj, htmlContent, htmlStrContent);
    } else {
      return TagRegistry.getAnytagDetails().renderTag(
        jsonObj,
        htmlContent,
        htmlStrContent
      );
    }
  }
}

module.exports = {
  TemplateEngine: TemplateEngine,
};

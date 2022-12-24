class AnyTag {
  static tagName = '';
  static content = 'any';
  static renderTag(jsonObj, htmlContent, htmlStr) {
    let attrStr = '';
    for (let attr in jsonObj.attributes) {
      attrStr += attr + "='" + jsonObj.attributes[attr] + "' ";
    }
    return `<${jsonObj.name.toLowerCase()} ${attrStr}>${
      htmlStr ? htmlStr : ''
    }</${jsonObj.name.toLowerCase()}>`;
  }
  static tagSchema = `<layout><content></content</layout>`;
}

module.exports = AnyTag

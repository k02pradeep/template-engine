class DataLabelTag {
  static tagName = 'data-label';
  static content = 'none';
  static renderTag(jsonObj, content) {
    let renderHtml = `<div class="data-label" tag-type="data-label">
        <span class="label">${jsonObj.attributes.label}</span>
        <span class="value">${jsonObj.attributes.value}</span>
      </div>`;
    return renderHtml;
  }
  static tagSchema = `
    <data-label icon="" label="required" value="required"></data-label>
  `;
}

module.exports = DataLabelTag

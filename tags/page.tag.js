class PageTag {
  static tagName = 'page';
  static content = 'fixed';
  static renderTag(jsonObj, htmlContent, htmlStr) {
    return `
    <div class="page">
      <div class="page-header-container">${htmlContent.pageHeader}</div>
      <div class="page-content-container">${htmlContent.pageContent}</div>
    </div>`;
  }
}

module.exports = PageTag

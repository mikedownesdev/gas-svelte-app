function doGet(e) {
  return HtmlService
    .createHtmlOutputFromFile("client/index.html")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

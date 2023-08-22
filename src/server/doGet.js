function doGet(e) {
  
  let appConfig = loadAppConfiguration_();
  if (!appConfig) { initializeApp(); }

  return HtmlService.createHtmlOutputFromFile(
    "client/index.html"
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

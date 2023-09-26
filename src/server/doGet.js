function doGet(e) {

  // We shouldn't load the application if we aren't able to get the user's
  // identity. In this case, we return the noAuth.html page.
  let activeUserEmail = Session.getActiveUser().getEmail();
  if (activeUserEmail === "") { return HtmlService.createTemplateFromFile('noAuth').evaluate() }

  // Otherwise, we check to see if this application has been initialized.
  // If not, we do so now
  let appConfig = loadAppConfiguration_();
  if (!appConfig) {
    initializeApp();
  }

  return HtmlService.createHtmlOutputFromFile(
    "client/index.html"
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

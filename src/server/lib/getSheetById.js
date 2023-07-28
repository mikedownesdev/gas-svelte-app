/**
 * 
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} spreadsheet
 * @param {number} id
 * @returns {GoogleAppsScript.Spreadsheet.Sheet}
 */
function getSheetById(spreadsheet, id) {
    return spreadsheet.getSheets().filter(
      function(s) {return s.getSheetId() === id;}
    )[0];
  }
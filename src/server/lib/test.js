const config = {
  spreadsheetId: "12vEyABdAPU36h_zSD6bYLQk3tkZEyLWjlPHl2NXdgwM",
  gid: "0",
  storageType: "Google Sheets",
  schema: {
    fields: [
      {
        label: "Full Name",
        name: "fullName",
        type: "string",
      },
      {
        label: "Email",
        name: "email",
        type: "string",
      },
      {
        label: "Favorite Color",
        name: "favoriteColor",
        type: "string",
      },
      {
        label: "Age",
        name: "age",
        type: "number",
        formatOptions: {
          numberFormat: "0",
        },
      },
      {
        label: "Salary (USD)",
        name: "salary",
        type: "number",
        formatOptions: {
          numberFormat: "0.00",
        },
      },
      {
        label: "Date of Birth",
        name: "dateOfBirth",
        type: "date",
      },
      {
        label: "Moment of Birth",
        name: "momentOfBirth",
        type: "date",
      },
    ],
  },
};

function test() {
  formatSheet(config);
}

/**
 * Create a sheet with the given config
 * @param {DatasourceConfiguration} dataSourceConfiguration
 */
function formatSheet(dataSourceConfiguration) {
  let { spreadsheetId, gid, schema } = config;

  let ss = SpreadsheetApp.openById(spreadsheetId); // handle error
  let sheetId = parseInt(gid);
  let sheet = getSheetById(ss, sheetId);

  let headerRange = sheet.getRange(
    1,
    1,
    sheet.getLastRow(),
    sheet.getLastColumn()
  );
  let headerValues = headerRange.getValues()[0];

  console.log(headerValues);

  schema.fields.forEach((field) => {
    console.log(`Seaching for field: ${field.name}`);

    let fieldIndex = headerValues.indexOf(field.name);

    let fieldColumnNumber;
    if (fieldIndex >= 0) {
      fieldColumnNumber = fieldIndex + 1;
    } else {
      let nextAvailableColumnNumber = sheet.getLastColumn() + 1;
      addFieldToSheet(sheet, nextAvailableColumnNumber, field);
      fieldColumnNumber = nextAvailableColumnNumber;
    }

    let columnRange = sheet.getRange(
      1,
      fieldColumnNumber,
      sheet.getLastRow(),
      1
    ); // Get the column

    if (field.formatOptions) {
      formatRange(columnRange, field.formatOptions);
    }
  });

  //Update protections to protect header row, which may or may not be longer
  // let headerProtection = columnHeaderRange.protect()
  // headerProtection
  //   .setWarningOnly(true)
  //   .setDescription('Header Name Protection')

  return true;
}

/**
 * @typedef {Object} FormattingOptions
 * @property {string} numberFormat
 */

/**
 * @param {SpreadsheetApp.Range} range
 * @param {FormattingOptions} options
 */
function formatRange(range, options) {
  range.setNumberFormat(options.numberFormat);
}

/**
 * @param {SpreadsheetApp.Sheet} sheet
 * @param {number} columnNumber
 * @param {FieldConfiguration}
 */
function addFieldToSheet(sheet, columnNumber, field) {
  let columnHeaderRange = sheet.getRange(1, columnNumber);
  let columnRange = sheet.getRange(1, columnNumber, sheet.getLastRow(), 1);

  // Add the column header
  columnHeaderRange.setValue(field.name);
}

function convertToObjects_(data) {
  const [headers, ...rows] = data;
  return rows.map((row) => {
    return headers.reduce((acc, header, index) => {
      acc[header] = row[index];
      return acc;
    }, {});
  });
}

/**
 * @param {ViewConfiguration} viewConfiguration
 * @returns {QueryResult}
 */
function query(viewConfiguration) {
  const { spreadsheetId, gid } = viewConfiguration.dataSource;
  const { fields } = viewConfiguration;

  const ss = SpreadsheetApp.openById(spreadsheetId);
  const sheet = getSheetById(ss, parseInt(gid));
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  const records = convertToObjects_(values);

  const data = records.map((record) => {
    return fields.reduce((acc, column) => {
      acc[column.name] = record[column.name];
      return acc;
    }, {});
  });

  return {
    producedAt: new Date().toISOString(),
    records: data,
  };
}

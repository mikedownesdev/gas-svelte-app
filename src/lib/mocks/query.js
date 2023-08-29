import { mockData } from "./data/mockData";

export default function query(viewConfiguration) {
  const { spreadsheetId, gid } = viewConfiguration.dataSource;
  const { fields } = viewConfiguration;
  const { records } = mockData[spreadsheetId];
  const data = records.map((record) => {
    return fields.reduce((acc, column) => {
      acc[column.name] = record[column.name];
      return acc;
    }, {});
  });
  return data;
}

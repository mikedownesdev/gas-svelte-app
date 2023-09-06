import { ViewConfigurationType } from "../../types/schemas";
import { mockData } from "./data/mockData";

/**
 * @param {ViewConfigurationType} viewConfiguration
 * @returns {Record<string, any>[]}
 */
export default function query(viewConfiguration: ViewConfigurationType) {
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

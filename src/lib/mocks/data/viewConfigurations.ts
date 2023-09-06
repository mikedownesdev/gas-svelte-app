import { ViewConfigurationType } from "../../../types/schemas";

/**
 * Mock data for view configurations
 * @type {ViewConfigurationType[]}}
 */
export const viewConfigurations: ViewConfigurationType[] = [
  {
    id: "1",
    label: "First View",
    dataSource: {
      spreadsheetId: "1XD1RVZsXw6DLQv_ksIdzuYdHPcsbpXhml94nMAz5_vA",
      gid: "0",
      storageType: "Google Sheets",
      schema: { fields: [] },
    },
    pageSize: 10,
    fields: [
      {
        label: "Full Name",
        name: "fullName",
        type: "string",
        width: 100,
        format: "text",
        filter: {
          type: "text",
          value: "",
        },
        sort: {
          type: "text",
          value: "",
        },
      },
      {
        label: "Job",
        name: "job",
        type: "string",
        width: 100,
        format: "text",
        filter: {
          type: "text",
          value: "",
        },
        sort: {
          type: "text",
          value: "",
        },
      },
      {
        label: "Favorite Color",
        name: "favoriteColor",
        type: "string",
        width: 100,
        format: "text",
        filter: {
          type: "text",
          value: "",
        },
        sort: {
          type: "text",
          value: "",
        },
      },
    ],
  },

  {
    id: "2",
    label: "Second View",
    dataSource: {
      spreadsheetId: "1XD1RVZsXw6DLQv_ksIdzuYdHPcsbpXhml94nMAz5_vA",
      gid: "0",
      storageType: "Google Sheets",
      schema: { fields: [] },
    },
    pageSize: 10,
    fields: [
      {
        label: "Full Name",
        name: "fullName",
        type: "string",
        width: 100,
        format: "text",
        filter: {
          type: "text",
          value: "",
        },
        sort: {
          type: "text",
          value: "",
        },
      },
      {
        label: "Favorite Color",
        name: "favoriteColor",
        type: "string",
        width: 100,
        format: "text",
        filter: {
          type: "text",
          value: "",
        },
        sort: {
          type: "text",
          value: "",
        },
      },
    ],
  },
];

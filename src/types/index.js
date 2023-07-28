/**
 * @typedef {Object} UserPreferences
 * @property {string} firstName
 * @property {string} lastName
 */


/**
 * @typedef {Object} DatasourceConfiguration
 * @property {string} spreadsheetId
 * @property {string} gid
 * @property {string} storageType
 * 
 */


/**
 * @typedef {Object} FieldConfiguration
 * @property {string} label
 * @property {string} name
 * @property {string} type
 * @property {number} width
 * @property {string} format
 * @property {Object} filter
 *      @property {string} filter.type
 *      @property {string} filter.value
 * @property {Object} sort
 *      @property {string} sort.type
 *      @property {string} sort.value
 */

/**
 * @typedef {Object} ViewConfiguration
 * @property {string} id
 * @property {DatasourceConfiguration} dataSource
 * @property {number} pageSize
 * @property {FieldConfiguration[]} fields
 */

/** 
 * Contains the data for the view, including its source (either `mocks` or `gas`)
 * as well as the configuration that produced the view and the records themselves.
 * 
 * @typedef {Object} View 
 * @property {string} source
 * @property {ViewConfiguration} configuration
 * @property {Object} data
 * @property {Object[]} data.records
 * 
 */

/**
 * @typedef {Object} AppConfiguration
 * @property {DatasourceConfiguration[]} dataSourceConfigurations 
 * @property {ViewConfiguration[]} viewConfigurations
 */
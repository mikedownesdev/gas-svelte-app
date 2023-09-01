/**
 * @typedef {Object} DatasourceConfiguration
 * @property {string} spreadsheetId
 * @property {string} gid
 * @property {string} storageType
 * @property {Object} schema
 *    @property {FieldConfiguration[]} schema.fields
 *
 */

/**
 * @typedef {Object} FieldConfiguration
 * @property {string} label
 * @property {string} name
 * @property {string} type
 * @property {number} [width]
 * @property {string} [format]
 * @property {Object} [filter]
 *      @property {string} filter.type
 *      @property {string} filter.value
 * @property {Object} [sort]
 *      @property {string} sort.type
 *      @property {string} sort.value
 */

/**
 * @typedef {Object} ViewConfiguration
 * @property {string} id
 * @property {string} label
 * @property {DatasourceConfiguration} dataSource
 * @property {number} pageSize
 * @property {FieldConfiguration[]} fields
 */

/**
 * @typedef {Object} QueryResult
 * @property {string} producedAt -- This is an ISO String representation of a timestamp.
 * @property {Object[]} records
 */

/**
 * Contains the data for the view, including its source (either `mocks` or `gas`)
 * as well as the configuration that produced the view and the records themselves.
 *
 * @typedef {Object} View
 * @property {string} source
 * @property {ViewConfiguration} configuration
 * @property {QueryResult} queryResult
 *
 */

/**
 * @typedef {Object} AppConfiguration
 * @property {string} [appName]
 * @property {string} deployingUserEmail
 * @property {string[]} admins
 * @property {DatasourceConfiguration[]} dataSourceConfigurations
 * @property {ViewConfiguration[]} viewConfigurations
 */

/**
 * @typedef {{ [key: string]: any }} UserPreferences
 */

/**
 * @typedef {{ imageUrl: string, [key: string]: string }} UserProfile
 */

/**
 * @typedef {Object} UserActivity
 * @property {string} label -- Label for the activity
 * @property {string} value -- This is an ISO String representation of a timestamp.
 */

/**
 * @typedef {Object} User
 * @property {string} email
 * @property {string[]} roles
 * @property {UserProfile} profile
 * @property {UserPreferences} preferences
 * @property {UserActivity[]} activity
 */

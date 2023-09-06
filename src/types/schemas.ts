import { z } from "zod";

const FieldConfiguration = z.object({
  label: z.string(),
  name: z.string(),
  type: z.string(),
  width: z.number().optional(),
  format: z.string().optional(),
  filter: z
    .object({
      type: z.string(),
      value: z.string(),
    })
    .optional(),
  sort: z
    .object({
      type: z.string(),
      value: z.string(),
    })
    .optional(),
});

const DatasourceConfiguration = z.object({
  spreadsheetId: z.string(),
  gid: z.string(),
  storageType: z.string(),
  schema: z.object({
    fields: z.array(FieldConfiguration),
  }),
});

const ViewConfiguration = z.object({
  id: z.string(),
  label: z.string(),
  dataSource: DatasourceConfiguration,
  pageSize: z.number(),
  fields: z.array(FieldConfiguration),
});

const QueryResult = z.object({
  producedAt: z.string(), // You can add custom validation to ensure it's an ISO string
  records: z.array(z.record(z.any())),
});

const View = z.object({
  source: z.string(),
  configuration: ViewConfiguration,
  queryResult: QueryResult,
});

const AppConfiguration = z.object({
  appName: z.string(),
  deployingUserEmail: z.string(),
  admins: z.array(z.string().email()),
  dataSourceConfigurations: z.array(DatasourceConfiguration),
  viewConfigurations: z.array(ViewConfiguration),
});

// const UserPreferences = z.record(z.any());
const UserPreferences = z.object({
  theme: z.enum(["light", "dark"]),
});

const UserProfile = z
  .object({
    imageUrl: z.string(),
  })
  .and(z.record(z.string()));

const UserActivity = z.object({
  label: z.string(),
  value: z.string(), // You can add custom validation to ensure it's an ISO string
});

const User = z.object({
  email: z.string().email(),
  roles: z.array(z.string()),
  profile: UserProfile,
  preferences: UserPreferences,
  activity: z.array(UserActivity),
});

export {
  FieldConfiguration,
  DatasourceConfiguration,
  ViewConfiguration,
  QueryResult,
  View,
  AppConfiguration,
  UserPreferences,
  UserProfile,
  UserActivity,
  User,
};

// If you want to infer types from Zod schemas
export type FieldConfigurationType = z.infer<typeof FieldConfiguration>;
export type DatasourceConfigurationType = z.infer<
  typeof DatasourceConfiguration
>;
export type ViewConfigurationType = z.infer<typeof ViewConfiguration>;
export type QueryResultType = z.infer<typeof QueryResult>;
export type ViewType = z.infer<typeof View>;
export type AppConfigurationType = z.infer<typeof AppConfiguration>;
export type UserPreferencesType = z.infer<typeof UserPreferences>;
export type UserProfileType = z.infer<typeof UserProfile>;
export type UserActivityType = z.infer<typeof UserActivity>;
export type UserType = z.infer<typeof User>;

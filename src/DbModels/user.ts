import {ObjectSchema, Realm} from 'realm';

export class UserDb extends Realm.Object {
  id!: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  gender?: 'male' | 'female' | null;
  preferences?: Array<{title: string; selected: boolean}>;
  interests?: Array<{title: string; selected: boolean}>;
  public static readonly schema: ObjectSchema = {
    name: 'UserData',
    properties: {
      id: {
        type: 'string',
      },
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      photo: {
        type: 'string',
        optional: true,
      },
      gender: 'string?',
      preferences: 'PreferenceAndInterests[]',
      interests: 'PreferenceAndInterests[]',
    },
    primaryKey: 'id',
  };
}

export class UserPreferencesAndInterests extends Realm.Object {
  title!: string;
  selected!: boolean;

  public static readonly schema: ObjectSchema = {
    name: 'PreferenceAndInterests',
    properties: {
      title: {
        type: 'string',
      },
      selected: {
        type: 'bool',
      },
    },
    primaryKey: 'title',
  };
}

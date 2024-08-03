import {ObjectSchema, Realm} from 'realm';
import {NotificationsData} from '../Defs/user';

export class UserDb extends Realm.Object {
  id!: string;
  firstName!: string;
  lastName!: string;
  photo!: string;
  gender!: 'male' | 'female' | null;
  email!: string;
  preferences!: Array<{title: string; selected: boolean}>;
  interests!: Array<{title: string; selected: boolean}>;
  storiesWatched!: Array<string>;
  notifications!: NotificationsData;
  createdOn!: string;
  syncStatus!: 'synced' | 'pending' | 'failed';

  public static readonly schema: ObjectSchema = {
    name: 'UserData',
    properties: {
      id: 'string',
      firstName: 'string',
      lastName: 'string',
      photo: 'string',
      gender: 'string?',
      email: 'string',
      preferences: {type: 'list', objectType: 'PreferenceAndInterests'},
      interests: {type: 'list', objectType: 'PreferenceAndInterests'},
      storiesWatched: {type: 'list', objectType: 'string'},
      notifications: {type: 'list', objectType: 'Notifications'},
      createdOn: 'string',
      syncStatus: 'string?',
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
      title: 'string',
      selected: 'bool',
    },
    primaryKey: 'title',
  };
}

export class NotificationsDb extends Realm.Object {
  userId!: string;
  message!: string;
  createdOn!: string;
  isUnread!: boolean;
  isShownViaPushNotification!: boolean;

  public static readonly schema: ObjectSchema = {
    name: 'Notifications',
    properties: {
      userId: 'string',
      message: 'string',
      createdOn: 'string',
      isUnread: 'bool',
      isShownViaPushNotification: 'bool',
    },
    primaryKey: 'userId',
  };
}

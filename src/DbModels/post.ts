import Realm, {ObjectSchema} from 'realm';

export class PostDb extends Realm.Object {
  photo!: string;
  caption!: string;

  public static readonly schema: ObjectSchema = {
    name: 'UserPost',
    properties: {
      photo: {
        type: 'string',
      },
      caption: {
        type: 'string',
      },
    },
    primaryKey: 'photo',
  };
}

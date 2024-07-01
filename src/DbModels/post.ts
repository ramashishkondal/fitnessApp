import Realm, {ObjectSchema} from 'realm';
import {Post} from '../Defs';

export class StoryDb extends Realm.Object {
  latestStoryOn!: Date;
  storyByUserId!: string;
  userName!: string;
  userPhoto!: string;
  stories!: Post;

  public static readonly schema: ObjectSchema = {
    name: 'UserStory',
    properties: {
      latestStoryOn: {
        type: 'date',
      },
      storyByUserId: {
        type: 'string',
      },
      userName: {
        type: 'string',
      },
      userPhoto: {
        type: 'string',
      },
      stories: 'Story[]',
    },
    primaryKey: 'storyByUserId',
  };
}

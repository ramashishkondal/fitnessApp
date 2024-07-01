import Realm, {ObjectSchema} from 'realm';
import {StoryData} from '../Utils/userUtils';

// Define the Story schema
export class SingleStoryDb extends Realm.Object {
  storyUrl!: string;
  storyType!: string;

  public static readonly schema: ObjectSchema = {
    name: 'Story',
    properties: {
      storyUrl: {
        type: 'string',
      },
      storyType: {
        type: 'string',
      },
    },
    primaryKey: 'storyUrl',
  };
}

export class StoryDb extends Realm.Object {
  latestStoryOn!: Date;
  storyByUserId!: string;
  userName!: string;
  userPhoto!: string;
  stories!: StoryData['stories'];

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

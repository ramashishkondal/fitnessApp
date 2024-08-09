import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Post} from '../../Defs';
import {StoryData} from '../../Utils/userUtils';

export type InitialState = {
  value: {
    posts: Post[];
    stories: StoryData[];
  };
};

const initialState: InitialState = {
  value: {
    posts: [],
    stories: [],
  },
};

export const communitySlice = createSlice({
  name: 'communitySlice',
  initialState,
  reducers: {
    updatePosts: (state, action: PayloadAction<Post[]>) => {
      state.value.posts = action.payload;
    },
    updateStoriesData: (state, action: PayloadAction<StoryData[]>) => {
      state.value.stories = action.payload;
    },
    resetCommunityData: state => {
      state.value = {
        posts: [],
        stories: [],
      };
    },
  },
});

const {reducer, actions} = communitySlice;
export const {resetCommunityData, updatePosts, updateStoriesData} = actions;

export default reducer;

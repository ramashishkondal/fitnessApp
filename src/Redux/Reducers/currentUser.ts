import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {User} from '../../Defs';

const initialState: {data: User & {password: string | null}} = {
  data: {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    finger: false,
    gender: null,
    interests: [],
    photo: '',
    preferences: [],
    password: null,
    healthData: [],
    notifications: [],
    storiesWatched: [],
    createdOn: '',
  },
};

export const currentUserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    updateUserData: (
      state,
      action: PayloadAction<Partial<User & {password: string | null}>>,
    ) => {
      console.log('updating user', action.payload);
      state.data = {...state.data, ...action.payload};
    },
    resetUserData: state => {
      state.data = {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        finger: false,
        gender: null,
        interests: [],
        photo: '',
        preferences: [],
        password: null,
        healthData: [],
        notifications: [],
        storiesWatched: [],
        createdOn: '',
      };
    },
  },
});

const {actions, reducer} = currentUserSlice;
export const {updateUserData, resetUserData} = actions;

export default reducer;

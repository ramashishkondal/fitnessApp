import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: {
    allowPushNotifications: false,
  },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettingPushNotification(state, action: PayloadAction<boolean>) {
      state.data.allowPushNotifications = action.payload;
    },
  },
});

const {actions, reducer} = settingsSlice;

export const {updateSettingPushNotification} = actions;

export default reducer;

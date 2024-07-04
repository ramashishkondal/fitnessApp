import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: {
    allowPushNotifications: false,
    cachedData: {
      isBiometricEnabled: true,
      password: '',
      email: '',
    },
  },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettingPushNotification(state, action: PayloadAction<boolean>) {
      state.data.allowPushNotifications = action.payload;
    },
    updateSettingsCachedData(
      state,
      action: PayloadAction<{
        isBiometricEnabled: boolean;
        password: string;
        email: string;
      }>,
    ) {
      state.data.cachedData = action.payload;
    },
  },
});

const {actions, reducer} = settingsSlice;

export const {updateSettingPushNotification, updateSettingsCachedData} =
  actions;

export default reducer;

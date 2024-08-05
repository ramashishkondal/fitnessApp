import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export type UserSettings = {
  allowPushNotifications: boolean;
  cachedData: {
    isBiometricEnabled: boolean;
    password: string;
    email: string;
    shouldAskBiometics: boolean;
    isSocial: boolean;
    shouldSignIn: boolean;
  };
};

const initialState: {data: UserSettings} = {
  data: {
    allowPushNotifications: false,
    cachedData: {
      isBiometricEnabled: false,
      password: '',
      email: '',
      shouldAskBiometics: true,
      isSocial: false,
      shouldSignIn: false,
    },
  },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettingPushNotification(
      state,
      action: PayloadAction<UserSettings['allowPushNotifications']>,
    ) {
      state.data.allowPushNotifications = action.payload;
    },
    updateSettingsCachedData(
      state,
      action: PayloadAction<Partial<UserSettings['cachedData']>>,
    ) {
      state.data.cachedData = {...state.data.cachedData, ...action.payload};
    },
  },
});

const {actions, reducer} = settingsSlice;

export const {updateSettingPushNotification, updateSettingsCachedData} =
  actions;

export default reducer;

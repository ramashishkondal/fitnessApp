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
  healthConnectPermissions: {
    steps: boolean;
    calories: boolean;
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
    healthConnectPermissions: {
      steps: false,
      calories: false,
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
    updateSettingsHealthConnectPermissions(
      state,
      action: PayloadAction<Partial<UserSettings['healthConnectPermissions']>>,
    ) {
      state.data.healthConnectPermissions = {
        ...state.data.healthConnectPermissions,
        ...action.payload,
      };
    },
  },
});

const {actions, reducer} = settingsSlice;

export const {
  updateSettingPushNotification,
  updateSettingsCachedData,
  updateSettingsHealthConnectPermissions,
} = actions;

export default reducer;

// libs
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Linking,
  NativeEventEmitter,
  NativeModules,
  Platform,
  Share,
  Text,
  View,
} from 'react-native';

// 3rd party
import auth from '@react-native-firebase/auth';

// custom
import {styles} from './styles';
import {STRING} from '../../../Constants';
import SettingsCard from '../../../Components/Molecules/SettingsCard';
import {SettingsProps} from '../../../Defs';
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {
  updateSettingPushNotification,
  updateSettingsCachedData,
  // updateSettingsCachedData,
} from '../../../Redux/Reducers/userSettings';
import {
  getSdkStatus,
  openHealthConnectSettings,
  SdkAvailabilityStatus,
} from 'react-native-health-connect';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import RNRestart from 'react-native-restart';
// import {storeBiometricData} from '../../../Utils/userUtils';
import ToastError from '../../../Components/Atoms/ToastError';
import {resetUserData} from '../../../Redux/Reducers/currentUser';

const Settings: React.FC<SettingsProps> = ({navigation}) => {
  // redux use
  const dispatch = useAppDispatch();
  const {isBiometricEnabled} = useAppSelector(
    state => state.settings.data.cachedData,
  );

  const {
    cachedData: {isSocial},
    allowPushNotifications,
  } = useAppSelector(state => state.settings.data);

  // state use
  const [switchActiveNotifications, setSwitchActiveNotifications] = useState(
    allowPushNotifications,
  );

  // functions
  const logOut = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      {
        text: 'YES',
        onPress: () => {
          dispatch(resetUserData());
          auth().signOut();
        },
      },
      {
        text: 'NO',
      },
    ]);
  };
  const goToHealthSettings = () => {
    const checkAvailabilityAndroid = async () => {
      const status = await getSdkStatus();
      if (status === SdkAvailabilityStatus.SDK_AVAILABLE) {
        openHealthConnectSettings();
      }

      if (status === SdkAvailabilityStatus.SDK_UNAVAILABLE) {
        ToastError('Error', 'Health Connect unavailable');
      }

      if (
        status ===
        SdkAvailabilityStatus.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED
      ) {
        ToastError('Error', 'Health Connect update required');
      }
    };
    Platform.OS === 'android'
      ? checkAvailabilityAndroid()
      : Alert.alert(
          'Open Health Settings',
          'To change HealthKit settings, please navigate to Settings > Health > Data Access & Devices.',
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Open Settings',
              onPress: () => {
                Linking.openURL('App-Prefs:root').catch(e => {
                  Alert.alert('Error', e);
                });
              },
            },
          ],
        );
  };
  const handlePushNotificationValueChange = async (val: boolean) => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      setSwitchActiveNotifications(val);
      dispatch(updateSettingPushNotification(val));
      if (val) {
        const notificationAuth = await request(
          PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        );
        if (notificationAuth === 'granted') {
          setSwitchActiveNotifications(val);
          dispatch(updateSettingPushNotification(val));
        }
        if (notificationAuth === 'blocked') {
          Alert.alert(
            'Notifications permissions denied',
            'You have to allow Notification permissions from the App settings to use notification feature of the app',
            [
              {
                text: 'Ok',
                onPress: () => {
                  Alert.alert(
                    'Restart App',
                    'The app needs to be restarted to apply any changes made to the permissions. Please click "OK" to restart now.',
                    [
                      {text: 'OK', onPress: RNRestart.restart},
                      {text: 'Cancel'},
                    ],
                  );

                  Linking.openSettings();
                },
              },
              {
                text: 'Cancel',
              },
            ],
          );
        }
        const notificationPerm = await check(
          PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        );
        if (notificationPerm !== 'granted') {
          setSwitchActiveNotifications(false);
          dispatch(updateSettingPushNotification(false));
        }
      }
    } else {
      setSwitchActiveNotifications(val);
      dispatch(updateSettingPushNotification(val));
    }
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "I'm using a fitness app to track my health stats—it's really helpful. You should consider downloading it too!",
        title: 'Fitness App',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      const {FingerPrintModule} = NativeModules;
      const fingerPrintEventEmitter = new NativeEventEmitter(FingerPrintModule);
      const onAuthSuccess = () => {
        console.log('Authentication Succeeded:');
        dispatch(updateSettingsCachedData({isBiometricEnabled: true}));
        // Handle successful authentication
      };

      const onAuthError = () => {
        console.log('Authentication Error:');
        dispatch(updateSettingsCachedData({isBiometricEnabled: false}));
        // Handle authentication error
      };

      const onAuthFailed = () => {
        console.log('Authentication Failed:');
        dispatch(updateSettingsCachedData({isBiometricEnabled: false}));
        // Handle authentication failure
      };

      const authSuccessListener = fingerPrintEventEmitter.addListener(
        'auth_success',
        onAuthSuccess,
      );

      const authErrorListener = fingerPrintEventEmitter.addListener(
        'auth_error',
        onAuthError,
      );

      const authFailedListener = fingerPrintEventEmitter.addListener(
        'auth_failed',
        onAuthFailed,
      );
      return () => {
        authSuccessListener.remove();
        authErrorListener.remove();
        authFailedListener.remove();
      };
    }
  }, [dispatch]);
  const handleFingerPrint = async (val: boolean) => {
    if (Platform.OS === 'android') {
      const handleErrorBiometric = (error: string) => {
        console.log('error in auth fingerprint', error);
      };

      dispatch(
        updateSettingsCachedData({isBiometricEnabled: !isBiometricEnabled}),
      );
      console.log('bio', val);
      if (val) {
        NativeModules.FingerPrintModule.authenticateFingerPrint().catch(
          handleErrorBiometric,
        );
      }
      return;
    } else {
      try {
        dispatch(
          updateSettingsCachedData({isBiometricEnabled: !isBiometricEnabled}),
        );
        if (val) {
          await NativeModules.FaceIdModule.authenticateWithFaceID();
        }
      } catch (error: any) {
        dispatch(updateSettingsCachedData({isBiometricEnabled: false}));
        if (error.message === 'Authentication failed') {
          return;
        }
        if (error.code === 'auth/network-request-failed') {
          ToastError('Authentication Error', error.code);
          return;
        }
        ToastError('Authentication Error', error.message);
      }
    }
  };

  return (
    <View style={styles.parent}>
      <Text style={styles.titleText}>{STRING.SETTINGS.TITLE}</Text>
      <View style={styles.editProfileCtr}>
        <SettingsCard
          title="Edit Profile"
          onPress={() => navigation.push('EditProfile', {from: 'Settings'})}
        />
        <SettingsCard title="Invite Friend" onPress={onShare} />
        {!isSocial ? (
          <SettingsCard
            title={`Enable ${
              Platform.OS === 'ios' ? 'face ID' : 'fingerprint'
            }`}
            hasSwitch
            switchActive={isBiometricEnabled}
            onSwitchValueChange={handleFingerPrint}
          />
        ) : null}
        <SettingsCard
          title="Push Notification"
          hasSwitch
          onSwitchValueChange={handlePushNotificationValueChange}
          switchActive={switchActiveNotifications}
        />
        {!isSocial ? (
          <SettingsCard
            title="Reset Password"
            onPress={() => navigation.navigate('ResetPassword')}
          />
        ) : null}
        <SettingsCard
          title={`Go to ${
            Platform.OS === 'android' ? 'Health Connect' : 'Health kit'
          } Settings`}
          onPress={goToHealthSettings}
        />
        <SettingsCard
          title="Give Feedback"
          onPress={() => navigation.push('GiveFeedback')}
        />

        <SettingsCard
          title="About Us"
          onPress={() => navigation.navigate('AboutUs')}
        />
        <SettingsCard title="Log Out" onPress={logOut} />
      </View>
    </View>
  );
};

export default Settings;

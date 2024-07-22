// libs
import React, {useState} from 'react';
import {Alert, Linking, Platform, Text, View} from 'react-native';

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
} from '../../../Redux/Reducers/userSettings';
import {
  getSdkStatus,
  openHealthConnectSettings,
  SdkAvailabilityStatus,
} from 'react-native-health-connect';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import RNRestart from 'react-native-restart';
import {storeBiometricData} from '../../../Utils/userUtils';
import ToastError from '../../../Components/Atoms/ToastError';

const Settings: React.FC<SettingsProps> = ({navigation}) => {
  // redux use
  const dispatch = useAppDispatch();
  const {finger, id} = useAppSelector(state => state.User.data);
  const {
    cachedData: {isSocial},
    allowPushNotifications,
  } = useAppSelector(state => state.settings.data);

  // state use
  const [switchActiveNotifications, setSwitchActiveNotifications] = useState(
    allowPushNotifications,
  );
  const [switchActiveFinger, setSwitchActiveFinger] = useState(finger);

  // functions
  const logOut = () => {
    Alert.alert('Logging Out', 'Are you sure you want to log out?', [
      {
        text: 'Ok',
        onPress: () => {
          dispatch(updateSettingsCachedData({isBiometricEnabled: finger}));
          auth().signOut();
        },
      },
      {
        text: 'Cancel',
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
      const notificationPerm = await check(
        PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
      );
      if (notificationPerm === 'granted' || val === false) {
        setSwitchActiveNotifications(val);
        dispatch(updateSettingPushNotification(val));
      }
      if (val && notificationPerm !== 'granted') {
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
      }
    } else {
      setSwitchActiveNotifications(val);
      dispatch(updateSettingPushNotification(val));
    }
  };

  const handleFingerPrint = async () => {
    setSwitchActiveFinger(!switchActiveFinger);
    // dispatch(updateSettingsCachedData({email,password:}))
    await storeBiometricData(!switchActiveFinger, id!);
  };

  return (
    <View style={styles.parent}>
      <Text style={styles.titleText}>{STRING.SETTINGS.TITLE}</Text>
      <View style={styles.editProfileCtr}>
        <SettingsCard
          title="Edit Profile"
          onPress={() => navigation.push('EditProfile', {from: 'Settings'})}
        />
        {!isSocial ? (
          <SettingsCard
            title={`Enable ${
              Platform.OS === 'ios' ? 'face ID' : 'fingerprint'
            }`}
            hasSwitch
            switchActive={switchActiveFinger}
            onSwitchValueChange={handleFingerPrint}
          />
        ) : null}
        <SettingsCard
          title="Push Notification"
          hasSwitch
          onSwitchValueChange={handlePushNotificationValueChange}
          switchActive={switchActiveNotifications}
        />
        <SettingsCard
          title="Reset Password"
          onPress={() => navigation.navigate('ResetPassword')}
        />
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

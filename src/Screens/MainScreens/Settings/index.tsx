// libs
import React, {useState} from 'react';
import {Alert, Linking, Platform, Share, Text, View} from 'react-native';

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
  // const [switchActiveFinger, setSwitchActiveFinger] =
  //   useState(isBiometricEnabled);

  // functions
  const logOut = () => {
    Alert.alert('Logging Out', 'Are you sure you want to log out?', [
      {
        text: 'Ok',
        onPress: () => {
          dispatch(resetUserData());
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
        Alert.alert(
          'Info',
          'Please go to the app permissions in the health settings to change it.',
          [
            {
              text: 'OK',
              onPress: () => openHealthConnectSettings(),
            },
            {
              text: 'Cancel',
            },
          ],
        );
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
    // if (val === false) {
    //   setSwitchActiveNotifications(val);
    //   dispatch(updateSettingPushNotification(val));
    // }
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      // if (notificationPerm === 'granted' || val === false) {
      // setSwitchActiveNotifications(val);
      //   dispatch(updateSettingPushNotification(val));
      // }
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
          'I am using Fitness App for keeps track of my health stats you should download it too.',
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
  const handleFingerPrint = async () => {
    // dispatch(updateSettingsCachedData({email,password:}))
    // await storeBiometricData(!switchActiveFinger, id!);
    dispatch(
      updateSettingsCachedData({isBiometricEnabled: !isBiometricEnabled}),
    );
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

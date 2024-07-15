// libs
import React from 'react';
import {Alert, Platform, Text, View} from 'react-native';

// 3rd party
import auth from '@react-native-firebase/auth';

// custom
import {styles} from './styles';
import {STRING} from '../../../Constants';
import SettingsCard from '../../../Components/Molecules/SettingsCard';
import {SettingsProps} from '../../../Defs';
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {updateSettingsCachedData} from '../../../Redux/Reducers/userSettings';
import {openHealthConnectSettings} from 'react-native-health-connect';

const Settings: React.FC<SettingsProps> = ({navigation}) => {
  // redux use
  const dispatch = useAppDispatch();
  const {finger} = useAppSelector(state => state.User.data);

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
    Platform.OS === 'android' ? openHealthConnectSettings() : null;
  };

  return (
    <View style={styles.parent}>
      <Text style={styles.titleText}>{STRING.SETTINGS.TITLE}</Text>
      <View style={styles.editProfileCtr}>
        <SettingsCard
          title="Edit Profile"
          onPress={() => navigation.push('EditProfile', {from: 'Settings'})}
        />
        <SettingsCard title="Push Notification" hasSwitch />
        <SettingsCard
          title="Reset Password"
          onPress={() => navigation.navigate('ResetPassword')}
        />
        <SettingsCard
          title="Go to Health Connect Settings"
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

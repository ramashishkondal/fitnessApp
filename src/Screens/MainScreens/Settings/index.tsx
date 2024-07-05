// libs
import React from 'react';
import {Text, View} from 'react-native';

// 3rd party
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// custom
import {styles} from './styles';
import {STRING} from '../../../Constants';
import SettingsCard from '../../../Components/Molecules/SettingsCard';
import {SettingsProps} from '../../../Defs';
// import {resetUserData} from '../../../Redux/Reducers/currentUser';
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {updateSettingsCachedData} from '../../../Redux/Reducers/userSettings';

const Settings: React.FC<SettingsProps> = ({navigation}) => {
  // redux use
  const dispatch = useAppDispatch();
  const {finger} = useAppSelector(state => state.User.data);

  // functions
  const logOut = () => {
    dispatch(updateSettingsCachedData({isBiometricEnabled: finger}));
    // dispatch(resetUserData());
    GoogleSignin.signOut();
    auth().signOut();
    auth().signOut();
  };

  return (
    <View style={styles.parent}>
      <Text style={styles.titleText}>{STRING.SETTINGS.TITLE}</Text>
      <View style={styles.editProfileCtr}>
        <SettingsCard
          title="Edit Profile"
          onPress={() => navigation.push('EditProfile')}
        />
        <SettingsCard title="Push Notification" hasSwitch />
        <SettingsCard
          title="Reset Password"
          onPress={() => navigation.navigate('ResetPassword')}
        />
        <SettingsCard title="Give Feedback" />
        <SettingsCard title="About Us" />
        <SettingsCard title="Log Out" onPress={logOut} />
      </View>
    </View>
  );
};

export default Settings;

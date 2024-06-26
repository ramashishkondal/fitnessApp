// libs
import React from 'react';
import {Text, View} from 'react-native';

// 3rd party
import auth from '@react-native-firebase/auth';

// custom
import {styles} from './styles';
import {STRING} from '../../../Constants';
import SettingsCard from '../../../Components/Molecules/SettingsCard';
import {SettingsProps} from '../../../Defs';
import {resetUserData} from '../../../Redux/Reducers/currentUser';
import {useAppDispatch} from '../../../Redux/Store';

const Settings: React.FC<SettingsProps> = ({navigation}) => {
  // redux use
  const dispatch = useAppDispatch();
  // functions
  const logOut = () => {
    dispatch(resetUserData());
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

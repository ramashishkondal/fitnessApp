// libs
import React from 'react';
import {Alert, View} from 'react-native';

// 3rd party
import auth from '@react-native-firebase/auth';

// custom
import {CustomLoading} from '../../../Components';
import {COLORS} from '../../../Constants';
import {styles} from './styles';
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {updateSettingsCachedData} from '../../../Redux/Reducers/userSettings';
import {LogOutProps} from '../../../Defs';
import {useFocusEffect} from '@react-navigation/native';
import {resetUserData} from '../../../Redux/Reducers/currentUser';

const LogOut: React.FC<LogOutProps> = ({navigation}) => {
  // redux use
  const dispatch = useAppDispatch();
  const {finger} = useAppSelector(state => state.User.data);

  // effect use
  useFocusEffect(() => {
    Alert.alert('Warning', 'Are you sure you want to logout?', [
      {
        text: 'yes',
        onPress: () => {
          dispatch(updateSettingsCachedData({isBiometricEnabled: finger}));
          dispatch(resetUserData());
          auth().signOut();
        },
      },
      {
        text: 'no',
        onPress: () => {
          navigation.goBack();
        },
      },
    ]);
  });

  return (
    <View style={styles.parent}>
      <CustomLoading color={COLORS.PRIMARY.PURPLE} size={'large'} />
    </View>
  );
};

export default LogOut;

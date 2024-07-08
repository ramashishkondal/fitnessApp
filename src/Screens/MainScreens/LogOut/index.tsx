// libs
import React, {useEffect} from 'react';
import {View} from 'react-native';

// 3rd party
import auth from '@react-native-firebase/auth';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';

// custom
import {CustomLoading} from '../../../Components';
import {COLORS} from '../../../Constants';
import {styles} from './styles';
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
// import {resetUserData} from '../../../Redux/Reducers/currentUser';
import {updateSettingsCachedData} from '../../../Redux/Reducers/userSettings';

const LogOut = () => {
  // redux use
  const dispatch = useAppDispatch();
  const {finger} = useAppSelector(state => state.User.data);
  // effect use
  useEffect(() => {
    dispatch(updateSettingsCachedData({isBiometricEnabled: finger}));
    // dispatch(resetUserData());
    // GoogleSignin.signOut();
    auth().signOut();
  }, [dispatch, finger]);

  return (
    <View style={styles.parent}>
      <CustomLoading color={COLORS.PRIMARY.PURPLE} size={'large'} />
    </View>
  );
};

export default LogOut;

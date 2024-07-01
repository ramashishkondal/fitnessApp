// libs
import React, {useEffect} from 'react';
import {View} from 'react-native';

// 3rd party
import auth from '@react-native-firebase/auth';

// custom
import {CustomLoading} from '../../../Components';
import {COLORS} from '../../../Constants';
import {styles} from './styles';
import {useAppDispatch} from '../../../Redux/Store';
import {resetUserData} from '../../../Redux/Reducers/currentUser';

const LogOut = () => {
  // redux use
  const dispatch = useAppDispatch();

  // effect use
  useEffect(() => {
    auth().signOut();
    dispatch(resetUserData());
  }, [dispatch]);

  return (
    <View style={styles.parent}>
      <CustomLoading color={COLORS.PRIMARY.PURPLE} size={'large'} />
    </View>
  );
};

export default LogOut;

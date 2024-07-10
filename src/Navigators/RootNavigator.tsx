// libs
import React, {useCallback, useEffect, useState} from 'react';

// 3rd party
import {NavigationContainer} from '@react-navigation/native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import BootSplash from 'react-native-bootsplash';

// custom
import OnboardingNav from './OnboardingNavigator';
import AppNavigator from './AppNavigator';
import {useDispatch} from 'react-redux';
import {CustomLoading} from '../Components';
import {updateUserData} from '../Redux/Reducers/currentUser';
import GoalModal from '../Components/Molecules/GoalModal';
import {useAppSelector} from '../Redux/Store';

const RootNavigator = () => {
  // state use
  const [initializing, setInitializing] = useState(true);

  // redux use
  const dispatch = useDispatch();
  const {id} = useAppSelector(state => state.User.data);

  // functions
  const onAuthStateChanged = useCallback(
    (userN: FirebaseAuthTypes.User | null) => {
      dispatch(updateUserData({id: userN === null ? undefined : userN.uid}));
      if (initializing) {
        setInitializing(false);
      }
    },
    [dispatch, initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  if (initializing) {
    return <CustomLoading />;
  }

  return (
    <NavigationContainer onReady={() => BootSplash.hide({fade: true})}>
      {id ? (
        <GoalModal>
          <AppNavigator />
        </GoalModal>
      ) : (
        <OnboardingNav />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;

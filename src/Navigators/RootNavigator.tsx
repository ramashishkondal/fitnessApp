// libs
import React, {useCallback, useEffect, useState} from 'react';

// 3rd party
import {NavigationContainer} from '@react-navigation/native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import BootSplash from 'react-native-bootsplash';

// custom
import OnboardingNav from './OnboardingNavigator';
import AppNavigator from './AppNavigator';
import {useAppDispatch} from '../Redux/Store';
import {CustomLoading} from '../Components';
import {updateUserData} from '../Redux/Reducers/currentUser';
import GoalModal from '../Components/Molecules/GoalModal';

const RootNavigator = () => {
  // state use
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  // redux use
  const dispatch = useAppDispatch();

  // functions
  const onAuthStateChanged = useCallback(
    (userN: FirebaseAuthTypes.User | null) => {
      setUser(userN);

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
      {user ? (
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

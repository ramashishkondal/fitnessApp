// libs
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NativeModules, Platform} from 'react-native';

// 3rd party
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import BootSplash from 'react-native-bootsplash';

// custom
import OnboardingNav from './OnboardingNavigator';
import AppNavigator from './AppNavigator';
import {useAppDispatch} from '../Redux/Store';
import {CustomLoading} from '../Components';
import {updateUserData} from '../Redux/Reducers/currentUser';
import GoalModal from '../Components/Molecules/GoalModal';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const {FingerPrintModule} = NativeModules;

GoogleSignin.configure({
  webClientId:
    '330526479136-sqf4ju2hq123ofkr2nak9hhc7ctg63gv.apps.googleusercontent.com',
});
const RootNavigator = () => {
  // state use
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  const routeNameRef = useRef<string>();
  const navigationRef = useRef<NavigationContainerRef>(null);

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
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        BootSplash.hide({fade: true});
        if (Platform.OS === 'android') {
          routeNameRef.current = navigationRef.current.getCurrentRoute().name;
          FingerPrintModule.setCurrentRoute(routeNameRef.current); // Set the initial route
        }
      }}
      onStateChange={() => {
        if (Platform.OS === 'android') {
          const currentRouteName = navigationRef.current.getCurrentRoute().name;
          routeNameRef.current = currentRouteName;
          FingerPrintModule.setCurrentRoute(currentRouteName); // Update route on state change
        }
      }}>
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

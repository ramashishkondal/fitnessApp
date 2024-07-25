// libs
import React, {useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';

// 3rd party
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// custom
import {SPACING, ICONS, COLORS} from '../../../Constants';
import CustomLoading from '../../Atoms/CustomLoading';
import {sendNotification, storeUserData} from '../../../Utils/userUtils';
import {styles} from './styles';
import {INTERESETS, preferencesData} from '../../../Constants/commonConstants';
import {useNetInfo} from '@react-native-community/netinfo';
import {SocialLoginProps} from './types';
import {useAppDispatch} from '../../../Redux/Store';
import {updateSettingsCachedData} from '../../../Redux/Reducers/userSettings';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import ToastError from '../../Atoms/ToastError';

const iconSize = 17;

const googleSignIn = async () => {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  } catch (e) {
    console.log('error e ', e);
  }
};

const SocialLogins: React.FC<SocialLoginProps> = ({setIsLoading}) => {
  //state use
  const [isLoadingSocial, setIsLoadingSocial] = useState<
    'twitter' | 'google' | null | 'facebook'
  >(null);
  // netInfo use
  const netInfo = useNetInfo();

  // redux use
  const dispatch = useAppDispatch();

  // functions
  const handleGoogleSignIn = async () => {
    if (!netInfo.isConnected) {
      Alert.alert('Network Error', 'Internet connection is disabled');
      return;
    }
    setIsLoading(true);
    setIsLoadingSocial('google');
    await GoogleSignin.signOut();
    const userData = await googleSignIn();
    dispatch(
      updateSettingsCachedData({isSocial: true, isBiometricEnabled: false}),
    );
    if (userData?.additionalUserInfo?.isNewUser) {
      const {email, displayName, photoURL: photo, uid: id} = userData.user;
      if (email !== null && photo !== null) {
        await storeUserData(
          {
            email,
            firstName: displayName?.split(' ')[0] ?? '',
            lastName: displayName?.split(' ')[1] ?? '',
            photo,
            id,
            finger: false,
            gender: null,
            interests: INTERESETS.map(item => {
              const {title, selected} = item;
              return {title, selected};
            }),
            preferences: preferencesData,
            healthData: [],
            notifications: [],
            storiesWatched: [],
          },
          id,
        );
        await sendNotification(
          {
            isShownViaPushNotification: false,
            isUnread: true,
            message: 'You have successfully registered on FitnessApp !',
            userId: 'App',
          },
          id,
        );
      }
    }
    setIsLoadingSocial(null);
    setIsLoading(false);
  };
  const handleFacebookSignIn = async () => {
    if (!netInfo.isConnected) {
      Alert.alert('Network Error', 'Internet connection is disabled');
      return;
    }
    try {
      setIsLoading(true);
      setIsLoadingSocial('facebook');
      await LoginManager.logInWithPermissions(['public_profile', 'email']);
      const a = await AccessToken.getCurrentAccessToken();
      const fbcreds = auth.FacebookAuthProvider.credential(a?.accessToken!);
      const creds = await auth().signInWithCredential(fbcreds);
      console.log('awd', creds.user);
      await storeUserData(
        {
          email: creds.user.email!,
          firstName: creds.user.displayName?.split(' ')[0]!,
          lastName:
            creds.user.displayName?.split(' ')[
              creds.user.displayName?.split(' ').length - 1
            ]!,
          photo: creds.user.photoURL!,
          id: creds.user.uid,
          finger: false,
          gender: null,
          interests: INTERESETS.map(item => {
            const {title, selected} = item;
            return {title, selected};
          }),
          preferences: preferencesData,
          healthData: [],
          notifications: [],
          storiesWatched: [],
        },
        creds.user.uid,
      );
      dispatch(
        updateSettingsCachedData({isSocial: true, isBiometricEnabled: false}),
      );
      sendNotification(
        {
          isShownViaPushNotification: false,
          isUnread: true,
          message: 'You have successfully registered on FitnessApp !',
          userId: 'App',
        },
        creds.user.uid,
      ).catch(e => {
        console.log('error with sending notification', e);
      });
      setIsLoading(false);
      setIsLoadingSocial(null);
    } catch (e) {
      ToastError('Error', '' + e);
    }
  };

  // const TWITTER_CONSTS = {
  //   API_KEY: 'CCFoN3B1il5hGF1bZLlEElT7L',
  //   API_KEY_SECRET: '4IRDzyhUtyV22JlznTodwMajLZgNErs57U1TORaENQ2gU8B5FN',
  // };
  // const handleTwitterLogIn = async () => {
  //   setIsLoading(true);
  //   setIsLoadingSocial('twitter');
  //   await RNTwitterSignIn.init(
  //     TWITTER_CONSTS.API_KEY,
  //     TWITTER_CONSTS.API_KEY_SECRET,
  //   );
  //   RNTwitterSignIn.logIn()
  //     .then(loginData => {
  //       console.log(loginData);
  //       const {authToken, email, userName} = loginData;
  //       if (authToken && email) {
  //         storeUserData(
  //           {
  //             email,
  //             firstName: userName?.split(' ')[0] ?? '',
  //             lastName: userName?.split(' ')[1] ?? '',
  //             photo:
  //               'https://firebasestorage.googleapis.com/v0/b/fitnessapp-44851.appspot.com/o/media%2FAvatars%2Favatar_1.jpg?alt=media&token=2272128b-8507-46cc-aca7-83517cedce92',
  //             id: authToken,
  //             finger: false,
  //             gender: null,
  //             interests: INTERESETS.map(item => {
  //               const {title, selected} = item;
  //               return {title, selected};
  //             }),
  //             preferences: preferencesData,
  //             healthData: [],
  //             notifications: [],
  //             storiesWatched: [],
  //           },
  //           authToken,
  //         );
  //         sendNotification(
  //           {
  //             isShownViaPushNotification: false,
  //             isUnread: true,
  //             message: 'You have successfully registered on FitnessApp !',
  //             userId: 'App',
  //           },
  //           authToken!,
  //         );
  //       }
  //     })
  //     .catch(error => {
  //       console.log('error', JSON.stringify(error));
  //       console.log(error);
  //     });
  //   setIsLoading(false);
  //   setIsLoadingSocial(null);
  // };

  return (
    <View style={[styles.logoCtr, SPACING.mt3]}>
      {/* <TouchableOpacity style={styles.logos} onPress={handleTwitterLogIn}>
        {isLoadingSocial == 'twitter' ? (
          <CustomLoading color={COLORS.PRIMARY.PURPLE} />
        ) : (
          ICONS.TwitterLogo({width: iconSize, height: iconSize})
        )}
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.logos} onPress={handleFacebookSignIn}>
        {isLoadingSocial === 'facebook' ? (
          <CustomLoading color={COLORS.PRIMARY.PURPLE} />
        ) : (
          ICONS.FacebookLogo({width: iconSize, height: iconSize})
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.logos} onPress={handleGoogleSignIn}>
        {isLoadingSocial === 'google' ? (
          <CustomLoading color={COLORS.PRIMARY.PURPLE} />
        ) : (
          ICONS.GoogleLogo({
            width: iconSize,
            height: iconSize,
            color: '#4E4BC7',
          })
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SocialLogins;

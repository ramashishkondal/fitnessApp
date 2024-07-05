// libs
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  NativeModules,
  Platform,
} from 'react-native';

// 3rd party
import auth from '@react-native-firebase/auth';
import {FirestoreError} from '@react-native-firebase/firestore';

// custom
import {
  WithOnboarding,
  CustomButton,
  CustomTextInput,
  SocialLogins,
  CustomErrorText,
} from '../../../Components';
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {isValidEmail} from '../../../Utils/checkValidity';
import {SignInProps} from '../../../Defs';
import {updateUserData} from '../../../Redux/Reducers/currentUser';
import {STRING, ICONS, SPACING} from '../../../Constants';
import {styles} from './styles';
import {updateSettingsCachedData} from '../../../Redux/Reducers/userSettings';

const SignIn = ({navigation}: SignInProps) => {
  // state use
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // redux use
  const {cachedData} = useAppSelector(state => state.settings.data);
  const dispatch = useAppDispatch();

  // cached data dependent use state
  const [email, setEmail] = useState<string>(
    cachedData.isBiometricEnabled ? cachedData.email : '',
  );
  console.log('cached data in sign in time is ', cachedData);

  // effect use
  useEffect(() => {
    const handleBiometricAuth = () => {
      if (Platform.OS === 'android') {
        NativeModules.FingerPrintModule.authenticateFingerPrint().then(() =>
          auth().signInWithEmailAndPassword(
            cachedData.email,
            cachedData.password,
          ),
        );
      } else {
        const handleFaceIDAuthentication = async () => {
          try {
            await NativeModules.FaceIdModule.authenticateWithFaceID();
            auth().signInWithEmailAndPassword(
              cachedData.email,
              cachedData.password,
            );
          } catch (error: any) {
            if (error.message === 'Authentication failed') {
              return;
            }
            Alert.alert('Authentication Error', error.message);
          }
        };
        if (cachedData.isBiometricEnabled) {
          handleFaceIDAuthentication();
        }
      }
    };
    if (cachedData.isBiometricEnabled) {
      handleBiometricAuth();
    }
  }, [cachedData, dispatch]);

  // functions
  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const {
        user: {uid},
      } = await auth().signInWithEmailAndPassword(email, password);
      dispatch(updateSettingsCachedData({email, password}));
      dispatch(updateUserData({id: uid}));
    } catch (e) {
      const error = e as FirestoreError;
      let message = error.message;
      if (
        error.message.includes('auth/invalid-email') ||
        error.message.includes('auth/wrong-password') ||
        error.message.includes('auth/invalid-credential')
      ) {
        message = 'Invalid email or password is entered.';
      } else if (error.message.includes('auth/user-not-found')) {
        message = 'Account not registered';
      }
      Alert.alert(message);
      console.log('error with sign in ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.push('ForgotPassword');
  };

  return (
    <View style={styles.parent}>
      <CustomTextInput
        value={email}
        placeHolder={STRING.SIGNIN.EMAIL}
        icon={ICONS.User({width: 18, height: 18})}
        parentStyle={[SPACING.mt5, styles.textInput]}
        onChangeText={setEmail}
        autoFocus={!cachedData.isBiometricEnabled}
      />
      {email && !isValidEmail(email) ? (
        <CustomErrorText text="Invalid Email Address" />
      ) : null}
      <CustomTextInput
        placeHolder={STRING.SIGNIN.PASSWORD}
        icon={ICONS.Lock({width: 18, height: 18})}
        parentStyle={[SPACING.mt3, styles.textInput]}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleForgotPassword} style={SPACING.mt3}>
        <Text style={styles.forgotPasswordText}>
          {STRING.SIGNIN.FORGOT_PASSWORD}
        </Text>
      </TouchableOpacity>
      <Text style={[styles.text, SPACING.mtMedium]}>
        {STRING.SIGNIN.SIGN_IN_WITH}
      </Text>
      <SocialLogins />
      <CustomButton
        title={STRING.SIGNIN.BUTTON_TEXT}
        parentStyle={styles.customButtonParent}
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </View>
  );
};

export default WithOnboarding(SignIn);

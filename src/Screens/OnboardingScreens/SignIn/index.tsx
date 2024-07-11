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
import {useNetInfo} from '@react-native-community/netinfo';

const SignIn = ({navigation}: SignInProps) => {
  // state use
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<'socialLogin' | 'continue' | null>(
    null,
  );
  const [activeOut, setActiveOut] = useState(false);

  // netinfo use
  const netInfo = useNetInfo();

  // redux use
  const {cachedData} = useAppSelector(state => state.settings.data);
  const dispatch = useAppDispatch();

  // cached data dependent use state
  const [email, setEmail] = useState<string>(
    cachedData.isBiometricEnabled ? cachedData.email : '',
  );

  // effect use
  useEffect(() => {
    const handleBiometricAuth = () => {
      if (Platform.OS === 'android') {
        NativeModules.FingerPrintModule.authenticateFingerPrint()
          .then(() =>
            auth()
              .signInWithEmailAndPassword(cachedData.email, cachedData.password)
              .catch(error => {
                if (error.code === 'auth/network-request-failed') {
                  Alert.alert('Network Error', 'Network connection disabled');
                }
              }),
          )
          .catch((error: string) => {
            if (error === 'Authentication failed') {
              return;
            }
            console.log('error in auth fingerprint', error);
            // Alert.alert('Authentication Error', error.message);
          });
      } else {
        const handleFaceIDAuthentication = async () => {
          try {
            await NativeModules.FaceIdModule.authenticateWithFaceID();
            await auth().signInWithEmailAndPassword(
              cachedData.email,
              cachedData.password,
            );
          } catch (error: any) {
            if (error.message === 'Authentication failed') {
              return;
            }
            if (error.code === 'auth/network-request-failed') {
              Alert.alert('Authentication Error', error.code);
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
    if (!netInfo.isConnected) {
      Alert.alert('Network Error', 'Internet connection is disabled');
      return;
    }
    if (email.trim() === '') {
      Alert.alert('Error', "Email address can't be empty");
      return;
    }
    if (password === '') {
      Alert.alert('Error', "Password can't be empty");
      return;
    }
    try {
      setIsLoading('continue');
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
      setIsLoading(null);
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
        textInputProps={{
          onBlur: () => setActiveOut(true),
          keyboardType: 'email-address',
        }}
      />
      {activeOut && email && !isValidEmail(email) ? (
        <CustomErrorText text="Invalid Email Address" />
      ) : null}
      <CustomTextInput
        placeHolder={STRING.SIGNIN.PASSWORD}
        icon={ICONS.Lock({width: 18, height: 18})}
        parentStyle={[SPACING.mt3, styles.textInput]}
        onChangeText={setPassword}
        allowPeeking
      />
      <TouchableOpacity
        onPress={handleForgotPassword}
        style={styles.forgotPasswordCtr}
        disabled={isLoading !== null}>
        <Text style={styles.forgotPasswordText}>
          {STRING.SIGNIN.FORGOT_PASSWORD}
        </Text>
      </TouchableOpacity>
      <Text style={[styles.text, SPACING.mtMedium]}>
        {STRING.SIGNIN.SIGN_IN_WITH}
      </Text>
      <SocialLogins
        isLoading={isLoading === 'socialLogin'}
        setIsLoading={(val: boolean) => {
          if (val) {
            setIsLoading('socialLogin');
          } else {
            setIsLoading(null);
          }
        }}
      />
      <CustomButton
        title={STRING.SIGNIN.BUTTON_TEXT}
        parentStyle={styles.customButtonParent}
        onPress={handleSignIn}
        isLoading={isLoading === 'continue'}
        disabled={isLoading === 'socialLogin'}
      />
    </View>
  );
};

export default WithOnboarding(SignIn);

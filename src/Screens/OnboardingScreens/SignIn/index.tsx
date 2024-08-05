// libs
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  NativeModules,
  Platform,
  Image,
  AppState,
  NativeEventEmitter,
} from 'react-native';

// 3rd party
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

// custom
import {
  CustomButton,
  CustomTextInput,
  SocialLogins,
  CustomErrorText,
} from '../../../Components';
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {isValidEmail} from '../../../Utils/checkValidity';
import {SignInProps} from '../../../Defs';
import {
  STRING,
  SPACING,
  IMAGES,
  COLORS,
  ICONS,
  SIZES,
} from '../../../Constants';
import {styles} from './styles';
import {updateSettingsCachedData} from '../../../Redux/Reducers/userSettings';
import {useNetInfo} from '@react-native-community/netinfo';
import ToastError from '../../../Components/Atoms/ToastError';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SignIn = ({navigation}: SignInProps) => {
  // state use
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<'socialLogin' | 'continue' | null>(
    null,
  );
  const [activeOut, setActiveOut] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
        const {FingerPrintModule} = NativeModules;
        const fingerPrintEventEmitter = new NativeEventEmitter(
          FingerPrintModule,
        );
        const onAuthSuccess = () => {
          console.log('====================================');
          console.log(cachedData.shouldSignIn);
          console.log('====================================');
          if (cachedData.shouldSignIn) {
            setIsLoading('continue');
            console.log('loggin you in');
            auth()
              .signInWithEmailAndPassword(cachedData.email, cachedData.password)
              .catch(handleErrorAuth)
              .finally(() => {
                setIsLoading(null);
              });
          }
          // Handle successful authentication
        };

        const authSuccessListener = fingerPrintEventEmitter.addListener(
          'auth_success',
          onAuthSuccess,
        );

        setIsLoading('continue');
        const handleErrorAuth = (error: any) => {
          if (error.code === 'auth/network-request-failed') {
            ToastError(
              STRING.COMMON_ERRORS.NETWORK_ERROR.TITLE,
              STRING.COMMON_ERRORS.NETWORK_ERROR.BODY,
            );
          }
        };

        const handleErrorBiometric = (error: string) => {
          console.log('error in auth fingerprint', error);
          if (error === 'Authentication failed') {
            setIsLoading(null);
          }
        };

        const authenticateAndSignIn = async () => {
          try {
            await NativeModules.FingerPrintModule.authenticateFingerPrint();
          } catch (error: any) {
            if (error.code) {
              handleErrorAuth(error);
            } else {
              handleErrorBiometric(error);
            }
          } finally {
            setIsLoading(null);
          }
        };

        // Call the function
        authenticateAndSignIn();
        return () => authSuccessListener.remove();
      } else {
        const handleFaceIDAuthentication = async () => {
          setIsLoading('continue');
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
              ToastError('Authentication Error', error.code);
              return;
            }
            ToastError('Authentication Error', error.message);
          } finally {
            setIsLoading(null);
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
  }, [cachedData]);

  // App state listener
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    console.log('Setting up AppState listener');
    const subscription = AppState.addEventListener('change', nextAppState => {
      console.log('AppState change detected:', nextAppState);
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      console.log('Removing AppState listener');
      subscription.remove();
    };
  }, []);

  // functions
  const handleSignIn = async () => {
    setIsSubmitted(true);
    if (!netInfo.isConnected) {
      Alert.alert(
        STRING.COMMON_ERRORS.NETWORK_ERROR.TITLE,
        STRING.COMMON_ERRORS.NETWORK_ERROR.BODY,
      );
      return;
    }
    if (
      email.trim() === '' ||
      password === '' ||
      isValidEmail(email) === false
    ) {
      return;
    }
    try {
      setIsLoading('continue');
      await auth().signInWithEmailAndPassword(email, password);
      dispatch(
        updateSettingsCachedData({
          email,
          password,
          isSocial: false,
          isBiometricEnabled: false,
        }),
      );
    } catch (e) {
      const error = e as FirebaseAuthTypes.NativeFirebaseAuthError;
      let message = error.message;

      if (error.code === 'auth/invalid-credential') {
        message = 'Invalid email or password entered.';
      }

      Alert.alert('Error', message);
      console.log('error with sign in ', error);
    } finally {
      setIsLoading(null);
    }
  };

  const handleForgotPassword = () => {
    navigation.push('ForgotPassword');
  };

  return (
    <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: COLORS.PRIMARY.GREY}}
      keyboardShouldPersistTaps="handled">
      <View style={styles.parent}>
        {appStateVisible !== 'active' && Platform.OS === 'ios' && (
          <View style={styles.absolute}>
            {ICONS.EyeClose({
              width: SIZES.width / 4,
              height: SIZES.width / 4,
              color: COLORS.SECONDARY.GREY,
            })}
          </View>
        )}
        <CustomTextInput
          value={email}
          placeHolder={STRING.SIGNIN.EMAIL}
          icon={<Image source={IMAGES.USER} style={{width: 18, height: 18}} />}
          parentStyle={[SPACING.mt5, styles.textInput]}
          onChangeText={setEmail}
          textInputProps={{
            onBlur: () => setActiveOut(true),
            keyboardType: 'email-address',
          }}
        />
        {(activeOut && email && !isValidEmail(email)) ||
        (isSubmitted && email && !isValidEmail(email)) ? (
          <CustomErrorText text="Invalid Email Address" />
        ) : null}
        {isSubmitted && !email ? (
          <CustomErrorText text="Email address can't be empty" />
        ) : null}
        {}
        <CustomTextInput
          placeHolder={STRING.SIGNIN.PASSWORD}
          icon={<Image source={IMAGES.LOCK} style={{width: 32, height: 32}} />}
          parentStyle={[SPACING.mt3, styles.textInput]}
          onChangeText={setPassword}
          allowPeeking
        />
        {isSubmitted && !password ? (
          <CustomErrorText text="Password can't be empty" />
        ) : null}
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
    </KeyboardAwareScrollView>
  );
};

export default SignIn;

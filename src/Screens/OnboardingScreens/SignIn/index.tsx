// libs
import React, {useState} from 'react';
import {Alert, Text, View, TouchableOpacity} from 'react-native';

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
import {useAppDispatch} from '../../../Redux/Store';
import {isValidEmail} from '../../../Utils/checkValidity';
import {SignInProps} from '../../../Defs';
import {updateUserData} from '../../../Redux/Reducers/currentUser';
import {STRING, ICONS, SPACING} from '../../../Constants';
import {styles} from './styles';

const SignIn = ({navigation}: SignInProps) => {
  // state use
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // redux use
  const dispatch = useAppDispatch();

  // functions
  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const {
        user: {uid},
      } = await auth().signInWithEmailAndPassword(email, password);
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
        placeHolder={STRING.SIGNIN.EMAIL}
        icon={ICONS.User({width: 18, height: 18})}
        parentStyle={[SPACING.mt5, styles.textInput]}
        onChangeText={setEmail}
        autoFocus
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

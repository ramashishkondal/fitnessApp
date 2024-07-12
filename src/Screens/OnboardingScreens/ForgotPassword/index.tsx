// libs
import React, {useState} from 'react';
import {Alert, View} from 'react-native';

// 3rd party
import auth from '@react-native-firebase/auth';

// custom
import {
  CustomTextInput,
  CustomErrorText,
  CustomButton,
  HeadingText,
} from '../../../Components';
import {SPACING, STRING} from '../../../Constants';
import {isValidEmail} from '../../../Utils/checkValidity';
import {ForgotPasswordProps} from '../../../Defs/navigators';
import {styles} from './styles';
import {useNetInfo} from '@react-native-community/netinfo';
import firestore from '@react-native-firebase/firestore';
import {firebaseDB} from '../../../Utils/userUtils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ForgotPassword: React.FC<ForgotPasswordProps> = ({navigation}) => {
  // state use
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isActiveOut, setIsActiveOut] = useState(false);

  // netInfo use
  const netInfo = useNetInfo();

  // functions
  const handleSubmit = async () => {
    if (!netInfo.isConnected) {
      Alert.alert('Network Error', 'Internet connection is disabled');
      return;
    }
    if (email.trim() === '') {
      Alert.alert('Error', "Email address can't be empty");
    }
    if (!isValidEmail(email)) {
      return;
    }
    const snapshot = await firestore()
      .collection(firebaseDB.collections.users)
      .where('email', '==', email)
      .get();
    if (snapshot.docs.length === 0) {
      Alert.alert('Error', 'Email address is not registered with Fitness App.');
      return;
    }
    setIsLoading(true);
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Reset Email sent to mail', email, [
        {text: 'Ok', onPress: () => navigation.navigate('SignIn')},
      ]);
    } catch (e) {
      console.log('error - ', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.parent}>
      <View style={[styles.child, SPACING.mt5, SPACING.mh1]}>
        <HeadingText text={STRING.ADD_EMAIL.TITLE} />
        <CustomTextInput
          placeHolder={STRING.ADD_EMAIL.TEXT_INPUT_PLACEHOLDER}
          parentStyle={[SPACING.mh2, SPACING.mt5]}
          textInputStyle={styles.textInput}
          onChangeText={setEmail}
          autoFocus
          textInputProps={{
            onBlur: () => setIsActiveOut(true),
            keyboardType: 'email-address',
          }}
        />
        {email && isActiveOut && !isValidEmail(email) ? (
          <CustomErrorText text={STRING.ADD_EMAIL.EMAIL_ERROR} />
        ) : null}
        <CustomButton
          title={STRING.ADD_EMAIL.BUTTON_TEXT}
          parentStyle={SPACING.mtXLarge}
          onPress={handleSubmit}
          isLoading={isLoading}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPassword;

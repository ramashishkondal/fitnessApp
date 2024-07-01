// libs
import React, {useCallback, useRef, useState} from 'react';
import {Alert, View} from 'react-native';

// custom
import {
  CustomButton,
  CustomErrorText,
  CustomTextInput,
  WithOnboarding,
  HeadingText,
} from '../../../Components';
import {SPACING, STRING} from '../../../Constants';
import {AddEmailLogInProps} from '../../../Defs';
import {isValidEmail} from '../../../Utils/checkValidity';
import {styles} from './styles';
import {useAppDispatch} from '../../../Redux/Store';
import {updateUserData} from '../../../Redux/Reducers/currentUser';
import firestore from '@react-native-firebase/firestore';
import {firebaseDB} from '../../../Utils/userUtils';

const AddEmail: React.FC<AddEmailLogInProps> = ({navigation}) => {
  // state use
  const [email, setEmail] = useState<string>('');

  // ref use
  const emailRef = useRef(email);

  // redux use
  const dispatch = useAppDispatch();

  // functions
  const handleSubmit = useCallback(async () => {
    const snapshot = await firestore()
      .collection(firebaseDB.collections.users)
      .where('email', '==', email)
      .get();
    if (snapshot.docs.length !== 0) {
      Alert.alert('Error', 'Email address already exists');
      return;
    }
    const currentEmail = emailRef.current;
    if (currentEmail === '') {
      Alert.alert('Email address cant be empty');
    } else if (currentEmail && isValidEmail(currentEmail)) {
      dispatch(updateUserData({email: currentEmail}));
      navigation.push('AddPassword');
    } else {
      Alert.alert(
        'Invalid email address',
        'Make sure entered email address is valid',
      );
    }
  }, [navigation, dispatch, email]);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    emailRef.current = text;
  };

  return (
    <View style={[styles.parent, SPACING.mt5, SPACING.mh1]}>
      <HeadingText text={STRING.ADD_EMAIL.TITLE} />
      <CustomTextInput
        placeHolder={STRING.ADD_EMAIL.TEXT_INPUT_PLACEHOLDER}
        parentStyle={[SPACING.mh2, SPACING.mt5]}
        textInputStyle={styles.textInput}
        onChangeText={handleEmailChange}
        autoFocus
      />
      {email && !isValidEmail(email) ? (
        <CustomErrorText text={STRING.ADD_EMAIL.EMAIL_ERROR} />
      ) : null}
      <CustomButton
        title={STRING.ADD_EMAIL.BUTTON_TEXT}
        parentStyle={SPACING.mtXLarge}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default WithOnboarding(AddEmail);

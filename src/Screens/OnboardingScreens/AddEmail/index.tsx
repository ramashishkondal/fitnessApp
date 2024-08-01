// libs
import React, {useCallback, useRef, useState} from 'react';
import {View} from 'react-native';

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
import ToastError from '../../../Components/Atoms/ToastError';

const AddEmail: React.FC<AddEmailLogInProps> = ({navigation}) => {
  // state use
  const [email, setEmail] = useState<string>('');
  const [activeOut, setActiveOut] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ref use
  const emailRef = useRef(email);

  // redux use
  const dispatch = useAppDispatch();

  // functions
  const handleSubmit = useCallback(async () => {
    setIsSubmitted(true);
    const currentEmail = emailRef.current;

    if (currentEmail.trim() === '' || !isValidEmail(currentEmail)) {
      return;
    }

    const snapshot = await firestore()
      .collection(firebaseDB.collections.users)
      .where('email', '==', email)
      .get();
    if (snapshot.docs.length !== 0) {
      ToastError('Error', 'Email address is already registered');
      return;
    }

    dispatch(updateUserData({email: currentEmail.toLowerCase()}));
    navigation.push('AddPassword');

    return;
  }, [navigation, dispatch, email]);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    emailRef.current = text;
  };

  return (
    <View style={[styles.parent, SPACING.mt5, SPACING.mh1]}>
      <HeadingText text={STRING.ADD_EMAIL.TITLE} />
      <View style={{}}>
        <CustomTextInput
          value={email}
          placeHolder={STRING.ADD_EMAIL.TEXT_INPUT_PLACEHOLDER}
          parentStyle={[SPACING.mh2, SPACING.mt5, {alignSelf: 'center'}]}
          textInputStyle={styles.textInput}
          onChangeText={handleEmailChange}
          autoFocus
          textInputProps={{
            onBlur: () => setActiveOut(true),
            keyboardType: 'email-address',
            maxLength: 50,
          }}
        />
        {(isSubmitted && email && !isValidEmail(email)) ||
        (activeOut && email && !isValidEmail(email)) ? (
          <CustomErrorText
            text={STRING.ADD_EMAIL.EMAIL_ERROR}
            parentStyle={SPACING.mh2}
          />
        ) : null}
        {isSubmitted && !email ? (
          <CustomErrorText
            text={STRING.ADD_EMAIL.EMAIL_ERROR_EMPTY}
            parentStyle={SPACING.mh2}
          />
        ) : null}
      </View>
      <CustomButton
        title={STRING.ADD_EMAIL.BUTTON_TEXT}
        parentStyle={SPACING.mtXLarge}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default WithOnboarding(AddEmail);

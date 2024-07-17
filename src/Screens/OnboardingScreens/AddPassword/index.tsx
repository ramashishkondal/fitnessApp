// libs
import React, {useState} from 'react';
import {styles} from './styles';
import {View} from 'react-native';

// 3rd party
import {useAppDispatch} from '../../../Redux/Store';
import {updateUserData} from '../../../Redux/Reducers/currentUser';

// custom
import {
  CustomButton,
  CustomTextInput,
  PasswordChecks,
  WithOnboarding,
  HeadingText,
} from '../../../Components';
import {SPACING, STRING} from '../../../Constants';
import {isValidPassword} from '../../../Utils/checkValidity';
import {AddPasswordProps} from '../../../Defs';
import ToastError from '../../../Components/Atoms/ToastError';

const AddPassword: React.FC<AddPasswordProps> = ({navigation}) => {
  // state use
  const [password, setPassword] = useState<string>('');

  // redux use
  const dispatch = useAppDispatch();

  // functions
  const handleSubmit = () => {
    if (password === '') {
      ToastError(
        STRING.ADD_PASSWORD.ERROR.HEADING,
        STRING.ADD_PASSWORD.ERROR.EMPTY,
      );
    } else if (isValidPassword.checkAllValidations(password)) {
      dispatch(updateUserData({password}));
      navigation.push('AddFirstName');
    } else {
      ToastError(
        STRING.ADD_PASSWORD.ERROR.HEADING,
        STRING.ADD_PASSWORD.ERROR.BODY,
      );
    }
  };

  return (
    <View style={[styles.parent, SPACING.mt5, SPACING.mh2]}>
      <HeadingText text={STRING.ADD_PASSWORD.TITLE} textStyle={SPACING.mh1} />
      <CustomTextInput
        placeHolder={STRING.ADD_PASSWORD.TEXT_INPUT_PLACEHOLDER}
        parentStyle={[[SPACING.mt64, {marginHorizontal: 12}]]}
        textInputStyle={styles.textInput}
        onChangeText={setPassword}
        autoFocus
        allowPeeking
      />
      <PasswordChecks
        lengthCheck={isValidPassword.lengthCheck(password)}
        caseCheck={isValidPassword.caseCheck(password)}
        numberCheck={isValidPassword.numberCheck(password)}
        specialCharCheck={isValidPassword.specialCharacterCheck(password)}
      />
      <CustomButton
        title={STRING.ADD_PASSWORD.BUTTON_TEXT}
        parentStyle={SPACING.mt96}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default WithOnboarding(AddPassword);

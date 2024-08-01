// libs
import React, {useState} from 'react';
import {View} from 'react-native';

// custom
import {
  CustomButton,
  CustomTextInput,
  WithOnboarding,
  HeadingText,
  CustomErrorText,
} from '../../../Components';
import {SPACING, STRING} from '../../../Constants';
import {AddEmailLogInProps} from '../../../Defs';
import {isValidName} from '../../../Utils/checkValidity';
import {styles} from './styles';
import {useAppDispatch} from '../../../Redux/Store';
import {updateUserData} from '../../../Redux/Reducers/currentUser';
import ToastError from '../../../Components/Atoms/ToastError';

const AddLastName: React.FC<AddEmailLogInProps> = ({navigation}) => {
  const [lastName, setLastName] = useState<string>('');
  const [shouldShowError, setShouldShowError] = useState<boolean>(false);

  // redux use
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    setShouldShowError(true);
    if (lastName.trim() === '') {
      ToastError('Error', 'Last name cant be empty!');
      return;
    }
    console.log('==', lastName, isValidName(lastName));
    if (isValidName(lastName) === false) {
      ToastError('Error', 'Invalid Last name entered.');
      return;
    }

    dispatch(updateUserData({lastName: lastName.replace(/\s+/g, ' ')}));
    navigation.push('AddFingerprint');
  };
  const handleChangeText = (text: string) => {
    setLastName(text);
  };

  return (
    <View style={[styles.parent, SPACING.mt5, SPACING.mh1]}>
      <HeadingText text={STRING.ADD_LAST_NAME.TITLE} />
      <CustomTextInput
        placeHolder={STRING.ADD_LAST_NAME.TEXT_INPUT_PLACE_HOLDER}
        parentStyle={[SPACING.mh2, SPACING.mt5]}
        textInputStyle={styles.textInput}
        onChangeText={handleChangeText}
        autoFocus
        textInputProps={{maxLength: 30, onBlur: () => setShouldShowError(true)}}
      />
      {shouldShowError && lastName && !isValidName(lastName) ? (
        <CustomErrorText text="Invalid Last name entered" />
      ) : null}
      <CustomButton
        title={STRING.ADD_LAST_NAME.BUTTON_TEXT}
        parentStyle={SPACING.mtXLarge}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default WithOnboarding(AddLastName);

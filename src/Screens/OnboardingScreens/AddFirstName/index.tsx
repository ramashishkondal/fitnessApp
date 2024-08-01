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

const AddFirstName: React.FC<AddEmailLogInProps> = ({navigation}) => {
  // state use
  const [firstName, setFirstName] = useState<string>('');
  const [shouldShowError, setShouldShowError] = useState<boolean>(false);

  // redux use
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    setShouldShowError(true);
    if (firstName.trim() === '') {
      ToastError('Error', 'First name cant be empty!');
      return;
    }

    if (isValidName(firstName) === false) {
      ToastError('Error', 'Invalid first name entered.');
      return;
    }

    dispatch(updateUserData({firstName: firstName.replace(/\s+/g, ' ')}));
    navigation.push('AddLastName');
  };

  const handleChangeText = (text: string) => {
    setFirstName(text);
  };

  return (
    <View style={[styles.parent, SPACING.mt5, SPACING.mh1]}>
      <HeadingText text={STRING.ADD_FIRST_NAME.TITLE} />
      <CustomTextInput
        placeHolder={STRING.ADD_FIRST_NAME.TEXT_INPUT_PLACE_HOLDER}
        parentStyle={[SPACING.mh2, SPACING.mt5]}
        textInputStyle={styles.textInput}
        onChangeText={handleChangeText}
        autoFocus
        textInputProps={{maxLength: 30, onBlur: () => setShouldShowError(true)}}
      />
      {shouldShowError && firstName && !isValidName(firstName) ? (
        <CustomErrorText text="Invalid First name entered" />
      ) : null}
      <CustomButton
        title={STRING.ADD_FIRST_NAME.BUTTON_TEXT}
        parentStyle={SPACING.mtXLarge}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default WithOnboarding(AddFirstName);

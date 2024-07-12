// libs
import React, {useState} from 'react';
import {Alert, View} from 'react-native';

// custom
import {
  CustomButton,
  CustomTextInput,
  WithOnboarding,
  HeadingText,
} from '../../../Components';
import {SPACING, STRING} from '../../../Constants';
import {AddEmailLogInProps} from '../../../Defs';
import {isValidName} from '../../../Utils/checkValidity';
import {styles} from './styles';
import {useAppDispatch} from '../../../Redux/Store';
import {updateUserData} from '../../../Redux/Reducers/currentUser';

const AddLastName: React.FC<AddEmailLogInProps> = ({navigation}) => {
  const [lastName, setLastName] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (lastName) {
      dispatch(updateUserData({lastName}));
      navigation.push('AddFingerprint');
    } else {
      Alert.alert('Error', 'Last name cant be empty!');
    }
  };
  const handleChangeText = (text: string) => {
    if (isValidName(text)) {
      setLastName(text);
    }
  };

  return (
    <View style={[styles.parent, SPACING.mt5, SPACING.mh1]}>
      <HeadingText text={STRING.ADD_LAST_NAME.TITLE} />
      <CustomTextInput
        value={lastName}
        placeHolder={STRING.ADD_LAST_NAME.TEXT_INPUT_PLACE_HOLDER}
        parentStyle={[SPACING.mh2, SPACING.mt5]}
        textInputStyle={styles.textInput}
        onChangeText={handleChangeText}
        autoFocus
        textInputProps={{maxLength: 30}}
      />
      <CustomButton
        title={STRING.ADD_LAST_NAME.BUTTON_TEXT}
        parentStyle={SPACING.mtXLarge}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default WithOnboarding(AddLastName);

// libs
import React, {useState} from 'react';
import {View} from 'react-native';

// custom
import {
  Card,
  CustomButton,
  DescriptionText,
  HeadingText,
} from '../../../Components';
import {ICONS, SPACING, STRING} from '../../../Constants';
import {AddGenderProps, User} from '../../../Defs';
import {styles} from './styles';
import {useAppDispatch} from '../../../Redux/Store';
import {updateUserData} from '../../../Redux/Reducers/currentUser';
import ToastError from '../../../Components/Atoms/ToastError';

const AddGender: React.FC<AddGenderProps> = ({navigation}) => {
  const [selectedGender, setSelectedGender] = useState<User['gender'] | null>(
    null,
  );
  const dispatch = useAppDispatch();
  const toggleCheckBox = (gender: User['gender']) => {
    setSelectedGender(gender);
  };
  const handleSubmit = () => {
    if (selectedGender !== null) {
      dispatch(updateUserData({gender: selectedGender}));
      navigation.reset({
        routes: [{name: 'DetailsCompleted'}],
      });
    } else {
      ToastError('Error', 'No gender selected');
    }
  };
  return (
    <View style={styles.parent}>
      <HeadingText text={STRING.ADD_GENDER.TITLE} textStyle={SPACING.mb5} />
      <View style={styles.genderCtr}>
        <View style={styles.genderCardsCtr}>
          <Card
            text={STRING.ADD_GENDER.MALE}
            icon={ICONS.Male}
            onToggle={() => toggleCheckBox('male')}
            isChecked={selectedGender === 'male'}
          />
          <Card
            text={STRING.ADD_GENDER.FEMALE}
            icon={ICONS.Female}
            onToggle={() => toggleCheckBox('female')}
            isChecked={selectedGender === 'female'}
          />
        </View>
      </View>
      <DescriptionText
        text={STRING.ADD_GENDER.DESCRIPTION}
        textStyle={styles.addGenderDescriptionText}
      />
      <CustomButton
        title={STRING.ADD_GENDER.BUTTON_TEXT}
        parentStyle={styles.customButtonParent}
        onPress={handleSubmit}
      />
    </View>
  );
};
export default AddGender;

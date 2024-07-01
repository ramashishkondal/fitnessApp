import React, {useState} from 'react';
import {View} from 'react-native';
import {CustomButton, CustomTextInput, HeadingText} from '../../Atoms';
import {ChangeUserInfoProps} from './types';
import {styles} from './styles';
import {ICONS, SPACING, STRING} from '../../../Constants';
import Card from '../Card';
import {User} from '../../../Defs';
import {useAppSelector} from '../../../Redux/Store';
import firestore from '@react-native-firebase/firestore';
import {firebaseDB} from '../../../Utils/userUtils';

const ChangeUserInfo: React.FC<ChangeUserInfoProps> = ({setModalFalse}) => {
  // redux use
  const {gender, id} = useAppSelector(state => state.User.data);

  // state use
  const [selectedGender, setSelectedGender] = useState<User['gender'] | null>(
    gender,
  );
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const toggleCheckBox = (g: User['gender']) => {
    setSelectedGender(g);
  };

  // functions
  const handleSubmitChange = async () => {
    if (firstName !== '' && lastName !== '') {
      await firestore()
        .collection(firebaseDB.collections.users)
        .doc(id!)
        .update({
          firstName,
          lastName,
          gender,
        });
      setModalFalse();
    }
  };
  return (
    <View style={styles.parent}>
      <HeadingText text="Edit User Info" textStyle={SPACING.mt1} />
      <CustomTextInput
        placeHolder="First Name"
        parentStyle={[SPACING.mh1, SPACING.mt5]}
        textInputStyle={styles.customTextInputStyle}
        onChangeText={setFirstName}
      />
      <CustomTextInput
        placeHolder="Last Name"
        parentStyle={[SPACING.mh1, SPACING.mt5]}
        textInputStyle={styles.customTextInputStyle}
        onChangeText={setLastName}
      />
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
      <CustomButton
        title="Submit"
        parentStyle={SPACING.mtXLarge}
        onPress={handleSubmitChange}
      />
    </View>
  );
};

export default ChangeUserInfo;

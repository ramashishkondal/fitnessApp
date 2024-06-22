import React, {useState} from 'react';
import {View} from 'react-native';
import {CustomButton, CustomTextInput, HeadingText} from '../../Atoms';
import {ChangeUserInfoProps} from './types';
import {styles} from './styles';
import {ICONS, SPACING, STRING} from '../../../Constants';
import Card from '../Card';
import {User} from '../../../Defs';
import {useAppSelector} from '../../../Redux/Store';

const ChangeUserInfo: React.FC<ChangeUserInfoProps> = () => {
  // redux use
  const {gender} = useAppSelector(state => state.User.data);

  // state use
  const [selectedGender, setSelectedGender] = useState<User['gender'] | null>(
    gender,
  );
  const toggleCheckBox = (gender: User['gender']) => {
    setSelectedGender(gender);
  };
  return (
    <View style={styles.parent}>
      <HeadingText text="Edit User Info" textStyle={SPACING.mt2} />
      <CustomTextInput
        placeHolder="First Name"
        parentStyle={[SPACING.mh1, SPACING.mt5]}
        textInputStyle={{textAlign: 'center'}}
      />
      <CustomTextInput
        placeHolder="Last Name"
        parentStyle={[SPACING.mh1, SPACING.mt5]}
        textInputStyle={{textAlign: 'center'}}
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
      <CustomButton title="Submit" parentStyle={SPACING.mtXLarge} />
    </View>
  );
};

export default ChangeUserInfo;

import React, {useState} from 'react';
import {Alert, Platform, View} from 'react-native';
import {CustomButton, CustomTextInput, HeadingText} from '../../Atoms';
import {ChangeUserInfoProps} from './types';
import {styles} from './styles';
import {COLORS, ICONS, SPACING, STRING} from '../../../Constants';
import Card from '../Card';
import {User} from '../../../Defs';
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import firestore from '@react-native-firebase/firestore';
import {firebaseDB} from '../../../Utils/userUtils';
import {useNetInfo} from '@react-native-community/netinfo';
import {useRealm} from '@realm/react';
import {UserDb} from '../../../DbModels/user';
import {updateUserData} from '../../../Redux/Reducers/currentUser';
import {UpdateMode} from 'realm';
import {isValidName} from '../../../Utils/checkValidity';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ChangeUserInfo: React.FC<ChangeUserInfoProps> = ({setModalFalse}) => {
  // redux use
  const {gender, id, preferences, interests} = useAppSelector(
    state => state.User.data,
  );
  const dispatch = useAppDispatch();

  // net info use
  const netInfo = useNetInfo();

  // realm use
  const realm = useRealm();

  // state use
  const [selectedGender, setSelectedGender] = useState<User['gender'] | null>(
    gender,
  );
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const toggleCheckBox = (g: User['gender']) => {
    setSelectedGender(g);
  };

  // functions
  const handleSubmitChange = async () => {
    if (firstName === '' || lastName === '') {
      Alert.alert('Error', "First name and Last name fields can't be empty");
      return;
    }

    if (netInfo.isConnected) {
      if (firstName !== '' && lastName !== '') {
        await firestore()
          .collection(firebaseDB.collections.users)
          .doc(id!)
          .update({
            firstName,
            lastName,
            gender: selectedGender,
          });
      }
    } else {
      realm.write(() => {
        realm.create(
          UserDb,
          {
            firstName: firstName,
            lastName: lastName,
            gender: selectedGender,
            id: id!,
            interests,
            preferences,
          },
          UpdateMode.Modified,
        );
      });
      dispatch(updateUserData({firstName, lastName, gender: selectedGender}));
    }
    setModalFalse();
  };
  const handleChangeFirstName = (text: string) => {
    if (isValidName(text)) {
      setFirstName(text);
    }
  };
  const handleChangeLastName = (text: string) => {
    if (isValidName(text)) {
      setLastName(text);
    }
  };
  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
        borderRadius: 10,
      }}
      extraScrollHeight={Platform.OS === 'ios' ? 160 : -275}
      enableOnAndroid={true}>
      <View style={styles.parent}>
        <HeadingText text="Edit User Info" textStyle={SPACING.mt1} />
        <CustomTextInput
          value={firstName}
          placeHolder="First Name"
          parentStyle={[SPACING.mh1, SPACING.mt5]}
          textInputStyle={styles.customTextInputStyle}
          onChangeText={handleChangeFirstName}
        />
        <CustomTextInput
          value={lastName}
          placeHolder="Last Name"
          parentStyle={[SPACING.mh1, SPACING.mt5]}
          textInputStyle={styles.customTextInputStyle}
          onChangeText={handleChangeLastName}
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
    </KeyboardAwareScrollView>
  );
};

export default ChangeUserInfo;

import React, {useState} from 'react';
import {Platform, View} from 'react-native';
import {
  CustomButton,
  CustomErrorText,
  CustomTextInput,
  HeadingText,
} from '../../Atoms';
import {ChangeUserInfoProps} from './types';
import {styles} from './styles';
import {ICONS, SPACING, STRING} from '../../../Constants';
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
import ToastError from '../../Atoms/ToastError';

const ChangeUserInfo: React.FC<ChangeUserInfoProps> = ({
  setModalFalse,
  delayed,
}) => {
  // redux use
  const {
    gender,
    id,
    firstName: fn,
    lastName: ln,
  } = useAppSelector(state => state.User.data);
  const dispatch = useAppDispatch();

  // net info use
  const netInfo = useNetInfo();

  // realm use
  const realm = useRealm();

  // state use
  const [selectedGender, setSelectedGender] = useState<User['gender'] | null>(
    gender,
  );
  const [firstName, setFirstName] = useState<string>(fn);
  const [lastName, setLastName] = useState<string>(ln);
  const [isLoading, setIsLoading] = useState(false);

  const toggleCheckBox = (g: User['gender']) => {
    setSelectedGender(g);
  };

  // functions
  const handleSubmitChange = async () => {
    if (firstName.trim() === '') {
      ToastError('Error', "First name  can't be empty");
      return;
    }
    if (lastName.trim() === '') {
      ToastError('Error', "Last name can't be empty");
      return;
    }
    if (!isValidName(firstName)) {
      ToastError('Error', 'Invalid first name entered');
      return;
    }
    if (!isValidName(lastName)) {
      ToastError('Error', 'Invalid last name entered');
      return;
    }
    if (delayed?.isDelayed && delayed.delayedSetter && delayed.delayedValues) {
      delayed.delayedSetter({
        ...delayed.delayedValues,
        firstName: firstName.replace(/\s+/g, ' '),
        lastName: lastName.replace(/\s+/g, ' '),
        gender: selectedGender,
      });
      setModalFalse();
      return;
    }

    if (netInfo.isConnected) {
      setIsLoading(true);
      await firestore()
        .collection(firebaseDB.collections.users)
        .doc(id!)
        .update({
          firstName: firstName.replace(/\s+/g, ' '),
          lastName: lastName.replace(/\s+/g, ' '),
          gender: selectedGender,
        })
        .finally(() => setIsLoading(false));
    } else {
      realm.write(() => {
        realm.create(
          UserDb,
          {
            firstName: firstName.replace(/\s+/g, ' '),
            lastName: lastName.replace(/\s+/g, ' '),
            gender: selectedGender,
            id: id!,
            syncStatus: 'pending',
          },
          UpdateMode.Modified,
        );
      });
      dispatch(updateUserData({firstName, lastName, gender: selectedGender}));
    }
    setTimeout(setModalFalse, 100);
  };
  const handleChangeFirstName = (text: string) => {
    setFirstName(text);
  };
  const handleChangeLastName = (text: string) => {
    setLastName(text);
  };
  return (
    <KeyboardAwareScrollView
      style={styles.keyboardAwareScroll}
      extraScrollHeight={Platform.OS === 'ios' ? 160 : -275}
      contentContainerStyle={{borderRadius: 10}}
      enableOnAndroid={true}>
      <View style={styles.parent}>
        <HeadingText text="Edit User Info" textStyle={SPACING.mt1} />
        <CustomTextInput
          value={firstName}
          placeHolder="First Name"
          parentStyle={[SPACING.mh1, SPACING.mt5]}
          textInputStyle={styles.customTextInputStyle}
          onChangeText={handleChangeFirstName}
          textInputProps={{maxLength: 30}}
        />
        {firstName && !isValidName(firstName) ? (
          <CustomErrorText text="Invalid first name entered" />
        ) : null}
        <CustomTextInput
          value={lastName}
          placeHolder="Last Name"
          parentStyle={[SPACING.mh1, SPACING.mt5]}
          textInputStyle={styles.customTextInputStyle}
          onChangeText={handleChangeLastName}
          textInputProps={{maxLength: 30}}
        />
        {lastName && !isValidName(lastName) ? (
          <CustomErrorText text="Invalid last name entered" />
        ) : null}
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
          parentStyle={{marginTop: 82, marginBottom: 40}}
          onPress={handleSubmitChange}
          isLoading={isLoading}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ChangeUserInfo;

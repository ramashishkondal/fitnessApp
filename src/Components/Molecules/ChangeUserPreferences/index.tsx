import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {ChangeUserPreferencesProps} from './types';
import PreferenceItem from '../PreferenceItem';
import {CustomButton, HeadingText} from '../../Atoms';
import {styles} from './styles';
import {SPACING} from '../../../Constants';
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import firestore from '@react-native-firebase/firestore';
import {firebaseDB} from '../../../Utils/userUtils';
import {User} from '../../../Defs';
import {useNetInfo} from '@react-native-community/netinfo';
import {useRealm} from '@realm/react';
import {UpdateMode} from 'realm';
import {UserDb} from '../../../DbModels/user';
import {updateUserData} from '../../../Redux/Reducers/currentUser';

const ChangeUserPreferences: React.FC<ChangeUserPreferencesProps> = ({
  setModalFalse,
}) => {
  // state use
  const [isLoading, setIsLoading] = useState(false);

  // redux use
  const {preferences, id, firstName, lastName, interests, gender} =
    useAppSelector(state => state.User.data);
  const dispatch = useAppDispatch();

  // netInfo use
  const netInfo = useNetInfo();

  // realm use
  const realm = useRealm();

  // ref use
  const preferencedData = useRef<User['preferences']>(
    JSON.parse(JSON.stringify(preferences)),
  );

  // functions
  const handleSubmitChange = async () => {
    if (netInfo.isConnected) {
      setIsLoading(true);
      await firestore()
        .collection(firebaseDB.collections.users)
        .doc(id!)
        .update({
          preferences: preferencedData.current,
        })
        .finally(() => setIsLoading(false));
    } else {
      realm.write(() => {
        realm.create(
          UserDb,
          {
            id: id!,
            preferences: preferencedData.current.map(val => val),
            firstName,
            lastName,
            interests,
            gender,
          },
          UpdateMode.Modified,
        );
      });
      dispatch(updateUserData({preferences: preferencedData.current}));
    }
    setModalFalse();
  };

  return (
    <View style={styles.parent}>
      <HeadingText text="Change Preferences" textStyle={SPACING.mt1} />
      <View style={SPACING.mt2} />
      {preferencedData.current.map((val, index) => {
        return <PreferenceItem item={val} key={index} />;
      })}
      <View style={styles.child}>
        <CustomButton
          title="Change"
          parentStyle={styles.customButtonParentStyle}
          onPress={handleSubmitChange}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

export default ChangeUserPreferences;

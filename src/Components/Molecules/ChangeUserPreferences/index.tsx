import React, {useRef} from 'react';
import {View} from 'react-native';
import {ChangeUserPreferencesProps} from './types';
import PreferenceItem from '../PreferenceItem';
import {CustomButton, HeadingText} from '../../Atoms';
import {styles} from './styles';
import {SPACING} from '../../../Constants';
import {useAppSelector} from '../../../Redux/Store';
import firestore from '@react-native-firebase/firestore';
import {firebaseDB} from '../../../Utils/userUtils';
import {User} from '../../../Defs';

const ChangeUserPreferences: React.FC<ChangeUserPreferencesProps> = ({
  setModalFalse,
}) => {
  // state use
  const {preferences, id} = useAppSelector(state => state.User.data);

  // ref use
  const preferencedData = useRef<User['preferences']>(
    JSON.parse(JSON.stringify(preferences)),
  );

  // functions
  const handleSubmitChange = async () => {
    await firestore().collection(firebaseDB.collections.users).doc(id!).update({
      preferences: preferencedData.current,
    });
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
        />
      </View>
    </View>
  );
};

export default ChangeUserPreferences;

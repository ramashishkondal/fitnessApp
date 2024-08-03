import React, {useState} from 'react';
import {FlatList, ListRenderItem, View} from 'react-native';
import {styles} from './styles';
import InterestItem from '../InterestItem';
import {CustomButton, HeadingText} from '../../Atoms';
import {SPACING} from '../../../Constants';
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {INTERESETS} from '../../../Constants/commonConstants';
import {ChangeUserInterestsProps} from './type';
import firestore from '@react-native-firebase/firestore';
import {firebaseDB} from '../../../Utils/userUtils';
import {useNetInfo} from '@react-native-community/netinfo';
import {useRealm} from '@realm/react';
import {UserDb} from '../../../DbModels/user';
import {updateUserData} from '../../../Redux/Reducers/currentUser';
import {UpdateMode} from 'realm';

const renderItem: ListRenderItem<{
  title: string;
  icon: React.ReactNode;
  selected: boolean;
}> = ({item}) => <InterestItem item={item} />;

const ChangeUserInterests: React.FC<ChangeUserInterestsProps> = ({
  setModalFalse,
  delayed,
}) => {
  // state use
  const [isLoading, setIsLoading] = useState(false);

  // redux use
  const {id, interests} = useAppSelector(state => state.User.data);
  const dispatch = useAppDispatch();

  // netInfo use
  const netInfo = useNetInfo();

  // realm use
  const realm = useRealm();

  // state dependent constant
  const interestDataWithIcons = interests.map((val, index) => ({
    ...val,
    icon: INTERESETS[index].icon,
  }));

  // functions
  const handleSubmitChange = async () => {
    if (delayed?.isDelayed && delayed.delayedSetter && delayed.delayedValues) {
      delayed.delayedSetter({
        ...delayed.delayedValues,
        interests: interestDataWithIcons.map(val => {
          const {selected, title} = val;
          return {selected, title};
        }),
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
          interests: interestDataWithIcons.map(val => {
            const {selected, title} = val;
            return {selected, title};
          }),
        })
        .finally(() => setIsLoading(false));
    } else {
      realm.write(() => {
        realm.create(
          UserDb,
          {
            id: id!,
            interests: interestDataWithIcons.map(val => {
              const {selected, title} = val;
              return {selected, title};
            }),
            syncStatus: 'pending',
          },
          UpdateMode.Modified,
        );
      });
      dispatch(
        updateUserData({
          interests: interestDataWithIcons.map(val => {
            const {selected, title} = val;
            return {selected, title};
          }),
        }),
      );
    }
    setModalFalse();
  };

  return (
    <View style={styles.parent}>
      <HeadingText text="Change Interests" textStyle={SPACING.mt1} />
      <View style={styles.flatListCtr}>
        <FlatList
          data={interestDataWithIcons}
          renderItem={renderItem}
          numColumns={3}
          style={styles.flatListStyle}
        />
      </View>
      <View style={styles.customButtonCtr}>
        <CustomButton
          title="Change"
          onPress={handleSubmitChange}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

export default ChangeUserInterests;

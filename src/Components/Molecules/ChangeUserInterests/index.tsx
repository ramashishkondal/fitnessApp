import React from 'react';
import {FlatList, ListRenderItem, View} from 'react-native';
import {styles} from './styles';
import InterestItem from '../InterestItem';
import {CustomButton, HeadingText} from '../../Atoms';
import {SPACING} from '../../../Constants';
import {useAppSelector} from '../../../Redux/Store';
import {INTERESETS} from '../../../Constants/commonConstants';
import {ChangeUserInterestsProps} from './type';
import firestore from '@react-native-firebase/firestore';
import {firebaseDB} from '../../../Utils/userUtils';

const renderItem: ListRenderItem<{
  title: string;
  icon: React.ReactNode;
  selected: boolean;
}> = ({item}) => <InterestItem item={item} />;

const ChangeUserInterests: React.FC<ChangeUserInterestsProps> = ({
  setModalFalse,
}) => {
  const {interests, id} = useAppSelector(state => state.User.data);

  const interestDataWithIcons = interests.map((val, index) => ({
    ...val,
    icon: INTERESETS[index].icon,
  }));

  // functions
  const handleSubmitChange = async () => {
    await firestore()
      .collection(firebaseDB.collections.users)
      .doc(id!)
      .update({
        interests: interestDataWithIcons.map(val => {
          const {selected, title} = val;
          return {selected, title};
        }),
      });
    setModalFalse();
  };

  return (
    <View style={styles.parent}>
      <HeadingText text="Change Interests" textStyle={SPACING.mt1} />
      <View style={{flex: 5, ...SPACING.mt2}}>
        <FlatList
          data={interestDataWithIcons}
          renderItem={renderItem}
          numColumns={3}
          style={styles.flatListStyle}
        />
      </View>
      <View style={{flex: 1, alignItems: 'center', paddingTop: 16}}>
        <CustomButton title="Change" onPress={handleSubmitChange} />
      </View>
    </View>
  );
};

export default ChangeUserInterests;

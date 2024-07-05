// libs
import React, {useRef} from 'react';
import {View, FlatList, ListRenderItem} from 'react-native';

//custom
import {CustomButton, InterestItem, HeadingText} from '../../../Components';
import {SPACING, STRING} from '../../../Constants';
import {styles} from './styles';
import {AddInterestsProps} from '../../../Defs';
import {useAppDispatch} from '../../../Redux/Store';
import {updateUserData} from '../../../Redux/Reducers/currentUser';
import {INTERESETS} from '../../../Constants/commonConstants';

const AddInterests: React.FC<AddInterestsProps> = ({navigation}) => {
  // redux use
  const dispatch = useAppDispatch();

  // ref use
  const interestsData = useRef(INTERESETS);
  // functions
  const goToAddGender = () => {
    const selectedItems: Array<{title: string; selected: boolean}> =
      interestsData.current
        .map(item => {
          const {title, selected} = item;
          return {title, selected};
        })
        .filter(val => val);
    dispatch(updateUserData({interests: selectedItems}));
    navigation.push('AddGender');
  };

  const renderItem: ListRenderItem<{
    title: string;
    icon: React.ReactNode;
    selected: boolean;
  }> = ({item}) => <InterestItem item={item} />;
  return (
    <View style={styles.parent}>
      <HeadingText text={STRING.ADD_INTERESTS.TITLE} textStyle={SPACING.mh2} />
      <FlatList
        data={interestsData.current}
        renderItem={renderItem}
        numColumns={3}
        style={styles.flatListStyle}
      />
      <View style={styles.buttonStyle}>
        <CustomButton
          title={STRING.ADD_INTERESTS.BUTTON_TEXT}
          onPress={goToAddGender}
        />
      </View>
    </View>
  );
};

export default AddInterests;

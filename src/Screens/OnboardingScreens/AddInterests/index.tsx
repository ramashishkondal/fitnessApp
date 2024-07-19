// libs
import React, {useRef} from 'react';
import {View, FlatList, ListRenderItem} from 'react-native';

//custom
import {CustomButton, InterestItem, HeadingText} from '../../../Components';
import {INTERESTS, SPACING, STRING} from '../../../Constants';
import {styles} from './styles';
import {AddInterestsProps} from '../../../Defs';
import {useAppDispatch} from '../../../Redux/Store';
import {updateUserData} from '../../../Redux/Reducers/currentUser';
import {ScrollView} from 'react-native-gesture-handler';

const iconSizeInterests = {
  width: 35,
  height: 35,
};
const AddInterests: React.FC<AddInterestsProps> = ({navigation}) => {
  // redux use
  const dispatch = useAppDispatch();

  // ref use
  const interestsData = useRef([
    {
      title: 'Fashion',
      icon: INTERESTS.Fashion(iconSizeInterests),
      selected: false,
    },
    {
      title: 'Organic',
      icon: INTERESTS.Organic(iconSizeInterests),
      selected: false,
    },
    {
      title: 'Meditation',
      icon: INTERESTS.Meditation(iconSizeInterests),
      selected: false,
    },
    {
      title: 'Fitness',
      icon: INTERESTS.Fitness(iconSizeInterests),
      selected: false,
    },
    {
      title: 'Smoke Free',
      icon: INTERESTS.SmokeFree(iconSizeInterests),
      selected: false,
    },
    {title: 'Sleep', icon: INTERESTS.Sleep(iconSizeInterests), selected: false},
    {
      title: 'Health',
      icon: INTERESTS.Health(iconSizeInterests),
      selected: false,
    },
    {
      title: 'Running',
      icon: INTERESTS.Running(iconSizeInterests),
      selected: false,
    },
    {title: 'Vegan', icon: INTERESTS.Vegan(iconSizeInterests), selected: false},
  ]);
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
    <ScrollView style={styles.parent}>
      <HeadingText text={STRING.ADD_INTERESTS.TITLE} textStyle={SPACING.mh2} />
      <FlatList
        data={interestsData.current}
        renderItem={renderItem}
        numColumns={3}
        style={styles.flatListStyle}
        scrollEnabled={false}
      />
      <View style={styles.buttonStyle}>
        <CustomButton
          title={STRING.ADD_INTERESTS.BUTTON_TEXT}
          onPress={goToAddGender}
        />
      </View>
    </ScrollView>
  );
};

export default AddInterests;

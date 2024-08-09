// libs
import React from 'react';
import {TouchableOpacity} from 'react-native';

// 3rd party
import {useNavigation} from '@react-navigation/native';

// custom
import {styles} from './styles';
import {StoryProps} from './types';
import {AppNavigationProps} from '../../../Defs/navigators';
import {useAppSelector} from '../../../Redux/Store';
import {CustomImage} from '../../Atoms';
import {COLORS, IMAGES} from '../../../Constants';
import {Timestamp} from '@react-native-firebase/firestore';

const Story: React.FC<StoryProps> = ({allStoryData, index}) => {
  const navigation = useNavigation<AppNavigationProps>();

  // redux use
  const {storiesWatched} = useAppSelector(state => state.User.data);

  // functions
  const goToStoriesScreen = () =>
    navigation.push('StoriesScreen', {allStoryData, index});
  return (
    <TouchableOpacity
      style={[
        styles.parent,
        storiesWatched.includes(
          allStoryData[index].storyByUserId +
            ' ' +
            Timestamp.fromMillis(
              allStoryData[index].latestStoryOn.seconds * 1000,
            )
              .toDate()
              .toISOString(),
        )
          ? {borderColor: COLORS.SECONDARY.GREY}
          : null,
      ]}
      onPress={goToStoriesScreen}>
      <CustomImage
        source={
          allStoryData[index].userPhoto
            ? {uri: allStoryData[index].userPhoto}
            : IMAGES.DEFAULT_USER
        }
        imageStyle={styles.photo}
      />
    </TouchableOpacity>
  );
};

export default Story;

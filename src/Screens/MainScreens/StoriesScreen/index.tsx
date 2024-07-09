// libs
import React, {useRef, useState} from 'react';
import {Pressable, Text, View} from 'react-native';

// 3rd party
import Video, {VideoRef, BufferingStrategyType} from 'react-native-video';
import GestureRecognizer from 'react-native-swipe-gestures';
import {useFocusEffect} from '@react-navigation/native';

// custom
import {CustomImage, CustomLoading} from '../../../Components';
import {COLORS} from '../../../Constants';
import {Timer} from '../../../Utils/commonUtils';
import {StoriesScreenProps} from '../../../Defs';
import {styles} from './styles';
import {updateStoriesWatchedArray} from '../../../Utils/userUtils';
import {useAppSelector} from '../../../Redux/Store';
import {Timestamp} from '@react-native-firebase/firestore';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const StoriesScreen: React.FC<StoriesScreenProps> = ({navigation, route}) => {
  // constants
  const allStoryData = route.params.allStoryData;

  // redux use
  const {id: userId} = useAppSelector(state => state.User.data);
  const insets = useSafeAreaInsets();

  // state use
  const [userIndex, setUserIndex] = useState(route.params.index);
  const [index, setIndex] = useState(0);
  const stories = allStoryData[userIndex].stories;

  // ref use
  const videoRef = useRef<VideoRef>(null);

  // focus effect use
  useFocusEffect(() => () => storyTimer.clear());

  // functions
  const goNext = () => {
    console.log('goNext called with', index);
    if (index === 0 && stories.length === 1) {
      updateStoriesWatchedArray(
        userId!,
        allStoryData[userIndex].storyByUserId,
        Timestamp.fromMillis(
          allStoryData[userIndex].latestStoryOn.seconds * 1000,
        )
          .toDate()
          .toISOString(),
      );
      if (userIndex < allStoryData.length - 1) {
        setIndex(0);
        setUserIndex(userIndex + 1);
      } else {
        navigation.goBack();
      }
    } else if (index < stories.length - 1) {
      if (index + 1 === stories.length - 1) {
        updateStoriesWatchedArray(
          userId!,
          allStoryData[userIndex].storyByUserId,
          Timestamp.fromMillis(
            allStoryData[userIndex].latestStoryOn.seconds * 1000,
          )
            .toDate()
            .toISOString(),
        );
      }
      setIndex(index + 1);
    } else {
      if (userIndex < allStoryData.length - 1) {
        setIndex(0);
        setUserIndex(userIndex + 1);
      } else {
        navigation.goBack();
      }
    }
  };

  const handleLeftSwipe = () => {
    if (userIndex < allStoryData.length - 1) {
      setUserIndex(userIndex + 1);
      setIndex(0);
    }
  };

  const handleRightSwipe = () => {
    if (userIndex > 0) {
      setUserIndex(userIndex - 1);
      setIndex(0);
    }
  };

  const handleLeftTap = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else if (index === 0 && userIndex !== 0) {
      setUserIndex(userIndex - 1);
    }
  };

  const storyTimer = new Timer(goNext);
  // const handlePause = () => {
  //   storyTimer.pause();
  //   videoRef.current?.pause();
  // };
  // const handleResume = () => {
  //   storyTimer.resume();
  //   videoRef.current?.resume();
  // };

  return (
    <View style={styles.parent} key={`${userIndex}-${index}`}>
      <View style={[styles.topInfoCtr, {top: insets.top}]}>
        <View style={styles.topCurrentStoryLineCtr}>
          {Array(allStoryData[userIndex].stories.length)
            .fill(0)
            .map((_val, i) => (
              <View
                key={i}
                style={[styles.line, i === index ? styles.lineActive : null]}
              />
            ))}
        </View>
        <View style={styles.userInfoCtr}>
          <View style={styles.customImageCtr}>
            <CustomImage
              source={{uri: allStoryData[userIndex].userPhoto}}
              imageStyle={styles.userImage}
              parentStyle={styles.customImageParent}
            />
          </View>
          <View style={styles.userNameCtr}>
            <Text style={styles.userNameText}>
              {allStoryData[userIndex].userName}
            </Text>
          </View>
        </View>
      </View>
      <GestureRecognizer
        style={styles.gestureRecognizer}
        onSwipeLeft={handleLeftSwipe}
        onSwipeRight={handleRightSwipe}
        onSwipeDown={() => {
          if (index === 0 && stories.length === 1) {
            updateStoriesWatchedArray(
              userId!,
              allStoryData[userIndex].storyByUserId,
              Timestamp.fromMillis(
                allStoryData[userIndex].latestStoryOn.seconds * 1000,
              )
                .toDate()
                .toISOString(),
            );
          }
          navigation.goBack();
        }}>
        <View style={styles.touchablesCtr}>
          <Pressable style={styles.leftPressable} onPress={handleLeftTap} />
          <Pressable style={styles.rightPressable} onPress={goNext} />
        </View>
        {stories[index].storyType.includes('video') ? (
          <View style={styles.videoCtr}>
            <CustomLoading
              size={'large'}
              style={styles.customLoading}
              color={COLORS.PRIMARY.PURPLE}
            />
            <Video
              source={{
                uri: stories[index].storyUrl,
              }}
              ref={videoRef}
              style={styles.video}
              onLoad={({duration}) =>
                storyTimer.start(duration < 15 ? duration * 1000 - 100 : 10000)
              }
              resizeMode="cover"
              bufferingStrategy={BufferingStrategyType.DEPENDING_ON_MEMORY}
            />
          </View>
        ) : (
          <CustomImage
            source={{uri: stories[index].storyUrl}}
            parentStyle={styles.customImage}
            activityIndicatorSize={'large'}
            handleLoadEnd={() => storyTimer.start(10000)}
          />
        )}
      </GestureRecognizer>
    </View>
  );
};

export default StoriesScreen;

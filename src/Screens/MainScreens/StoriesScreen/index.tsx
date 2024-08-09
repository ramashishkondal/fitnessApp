// libs
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Alert, Pressable, Text, View, TouchableOpacity} from 'react-native';
import Video, {VideoRef, BufferingStrategyType} from 'react-native-video';
import GestureRecognizer from 'react-native-swipe-gestures';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

// custom
import {CustomImage} from '../../../Components';
import {Timer} from '../../../Utils/commonUtils';
import {StoriesScreenProps} from '../../../Defs';
import {styles} from './styles';
import {
  deleteStoryByUpdatingArray,
  updateStoriesWatchedArray,
} from '../../../Utils/userUtils';
import {useAppSelector} from '../../../Redux/Store';
import {Timestamp} from '@react-native-firebase/firestore';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, IMAGES, SIZES} from '../../../Constants';
import {useFocusEffect} from '@react-navigation/native';

const StoriesScreen: React.FC<StoriesScreenProps> = ({navigation, route}) => {
  // constants
  const allStoryData = useMemo(
    () => route.params.allStoryData,
    [route.params.allStoryData],
  );
  const [storyPaused, setStoryPause] = useState(false);

  // redux use
  const {id: userId} = useAppSelector(state => state.User.data);
  const insets = useSafeAreaInsets();

  // state use
  const [userIndex, setUserIndex] = useState(route.params.index);
  const [index, setIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const stories = useMemo(
    () =>
      allStoryData[userIndex].stories.filter(z => {
        const dd = new Date(z.storyCreatedOn);
        const now = new Date();

        // Calculate the difference in milliseconds between now and dd
        const timeDiff = now.getTime() - dd.getTime();

        // Convert 24 hours to milliseconds
        const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

        // Check if the time difference is greater than or equal to 24 hours
        if (timeDiff >= twentyFourHoursInMs) {
          return false;
        }

        return true;
      }),
    [allStoryData, userIndex],
  );

  // ref use
  const videoRef = useRef<VideoRef>(null);

  // focus effect use
  useFocusEffect(() => () => storyTimer.clear());

  // Reanimated values
  const progress = useSharedValue(0);

  // Animated style for progress bar
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
    backgroundColor: COLORS.PRIMARY.PURPLE,
    height: 4,
  }));

  // functions
  const goNext = () => {
    if (showMenu) {
      setShowMenu(false);
      return;
    }
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
    if (showMenu) {
      setShowMenu(false);
      return;
    }
    if (userIndex < allStoryData.length - 1) {
      setUserIndex(userIndex + 1);
      setIndex(0);
    }
  };

  const handleRightSwipe = () => {
    if (showMenu) {
      setShowMenu(false);
      return;
    }
    if (userIndex > 0) {
      setUserIndex(userIndex - 1);
      setIndex(0);
    }
  };

  const handleLeftTap = () => {
    if (showMenu) {
      setShowMenu(false);
      return;
    }
    if (index > 0) {
      setIndex(index - 1);
    } else if (index === 0 && userIndex !== 0) {
      setUserIndex(userIndex - 1);
    }
  };

  const handleStoryDelete = () => {
    if (showMenu) {
      setShowMenu(false);
    }
    Alert.alert('Warning', 'Are you sure you want to delete the story?', [
      {
        text: 'YES',
        onPress: () => {
          deleteStoryByUpdatingArray(
            userId!,
            allStoryData[userIndex].stories.filter(
              val => val.storyUrl !== stories[index].storyUrl,
            ),
          );
          navigation.goBack();
        },
      },
      {
        text: 'NO',
      },
    ]);
  };

  const storyTimer = new Timer(goNext);
  useEffect(() => {
    setStoryPause(false);
  }, [index]);
  useEffect(() => {
    if (storyPaused) {
      progress.value = 1;
      return;
    }
    if (stories[index].storyType.includes('video')) {
      videoRef.current?.seek(0);
      progress.value = 0;
    } else {
      progress.value = withTiming(1, {duration: 10000});
    }

    return () => {
      progress.value = 0;
    };
  }, [index, progress, stories, storyPaused]);

  return (
    <View style={styles.parent} key={`${userIndex}-${index}`}>
      <View style={[styles.topInfoCtr, {top: insets.top}]}>
        <View style={styles.topCurrentStoryLineCtr}>
          {Array(stories.length)
            .fill(0)
            .map((_val, i) => {
              if (i === index) {
                return (
                  <View style={styles.line}>
                    <Animated.View
                      key={i}
                      style={[
                        {
                          borderWidth: 0.5,
                          borderColor: 'grey',
                          backgroundColor: 'white',
                          height: 4,
                          // flex: 1,
                          borderRadius: 200,
                        },
                        animatedStyle,
                      ]}
                    />
                  </View>
                );
              }
              return <View key={i} style={styles.line} />;
            })}
        </View>
        <View style={styles.userInfoCtr}>
          <View style={styles.customImageCtr}>
            <CustomImage
              source={
                allStoryData[userIndex].userPhoto
                  ? {uri: allStoryData[userIndex].userPhoto}
                  : IMAGES.DEFAULT_USER
              }
              imageStyle={styles.userImage}
              parentStyle={styles.customImageParent}
            />
          </View>
          <View style={styles.userNameCtr}>
            <Text style={styles.userNameText}>
              {allStoryData[userIndex].userName}
            </Text>
          </View>
          {userId === allStoryData[userIndex].storyByUserId ? (
            <Pressable
              onPress={() => {
                setShowMenu(true);
                setStoryPause(true);
                videoRef.current?.seek(20000);
                videoRef.current?.pause();
              }}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <View style={styles.dots} />
              <View style={styles.dots} />
              <View style={styles.dots} />
            </Pressable>
          ) : null}
          {showMenu ? (
            <TouchableOpacity
              style={styles.menuCtr}
              onPress={handleStoryDelete}>
              <Text style={{fontSize: SIZES.font15, color: 'black'}}>
                Delete
              </Text>
            </TouchableOpacity>
          ) : null}
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
            <Video
              source={{
                uri: stories[index].storyUrl,
              }}
              ref={videoRef}
              style={styles.video}
              onLoad={({duration}) => {
                storyTimer.start(duration < 10 ? duration * 1000 : 10000);
                progress.value = withTiming(1, {
                  duration: (duration < 10 ? duration * 1000 : 10000) - 100,
                });
              }}
              resizeMode="cover"
              bufferingStrategy={BufferingStrategyType.DEPENDING_ON_MEMORY}
              shutterColor="transparent"
              bufferConfig={{cacheSizeMB: 200}}
            />
          </View>
        ) : (
          <CustomImage
            source={{uri: stories[index].storyUrl}}
            parentStyle={styles.customImage}
            activityIndicatorSize={'large'}
            handleLoadEnd={() => {
              storyTimer.start(10000);
            }}
          />
        )}
      </GestureRecognizer>
    </View>
  );
};

export default StoriesScreen;

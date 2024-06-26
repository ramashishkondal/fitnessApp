// libs
import React, {useRef, useState} from 'react';
import {Platform, Pressable, Text, View} from 'react-native';

// 3rd party
import Video, {VideoRef} from 'react-native-video';
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
import {FONT_FAMILY, SIZES} from '../../../Constants/commonStyles';

const StoriesScreen: React.FC<StoriesScreenProps> = ({navigation, route}) => {
  // constants
  const allStoryData = route.params.allStoryData;

  // redux use
  const {id: userId} = useAppSelector(state => state.User.data);

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
    if (index < stories.length - 1) {
      setIndex(index + 1);
    } else if (index === stories.length - 1) {
      console.log('watched', allStoryData[userIndex]);
      updateStoriesWatchedArray(userId!, allStoryData[userIndex].storyByUserId);
      if (userIndex < allStoryData.length - 1) {
        setUserIndex(userIndex + 1);
        setIndex(0);
      } else if (userIndex === allStoryData.length - 1) {
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
    }
  };

  const storyTimer = new Timer(goNext);

  return (
    <View style={styles.parent} key={`${userIndex}-${index}`}>
      <View
        style={{
          position: 'absolute',
          height: 40,
          top: 2,
          width: '100%',
          zIndex: 1,
          // flexDirection: 'column',
          alignItems: 'center',
          paddingHorizontal: 16,
        }}>
        <View style={{flexDirection: 'row', marginTop: 8}}>
          {Array(allStoryData[userIndex].stories.length)
            .fill(0)
            .map((_val, i) => (
              <View
                style={[
                  {
                    flex: 1,
                    backgroundColor: 'white',
                    borderWidth: 0.25,
                    borderColor: 'black',
                    marginHorizontal: 4,
                    height: 4,
                    borderRadius: 200,
                  },
                  i === index ? {backgroundColor: COLORS.PRIMARY.PURPLE} : null,
                ]}
              />
            ))}
        </View>
        <View
          style={{flexDirection: 'row', marginTop: 8, alignItems: 'center'}}>
          <View style={{flex: 0.15}}>
            <CustomImage
              source={{uri: allStoryData[userIndex].userPhoto}}
              imageStyle={{
                borderRadius: 200,
                borderWidth: 1.0,
                borderColor: 'white',
              }}
              parentStyle={{
                width: 45,
                height: 45,
                shadowColor: '#585858',
                shadowRadius: 10,
                shadowOpacity: 0.5,
              }}
            />
          </View>
          <View style={{flex: 0.85}}>
            <Text
              style={{
                color: 'white',
                fontFamily: FONT_FAMILY.BOLD,
                fontSize: SIZES.font13,
                textShadowColor: '#585858',
                textShadowRadius: 10,
                shadowOpacity: 0.5,
              }}>
              {allStoryData[userIndex].userName}
            </Text>
          </View>
        </View>
      </View>
      <GestureRecognizer
        style={styles.gestureRecognizer}
        onSwipeLeft={handleLeftSwipe}
        onSwipeRight={handleRightSwipe}
        onSwipeDown={
          Platform.OS === 'android' ? () => navigation.goBack() : () => {}
        }>
        <View style={styles.touchablesCtr}>
          <Pressable
            style={styles.leftPressable}
            onPress={handleLeftTap}
            onLongPress={() => storyTimer.pause()}
            onPressOut={() => storyTimer.resume()}
          />
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
                storyTimer.start(duration < 15 ? duration * 1000 - 300 : 10000)
              }
              resizeMode="cover"
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

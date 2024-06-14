// libs
import React, { useRef, useState } from "react";
import { Pressable, View } from "react-native";

// 3rd party
import Video, { VideoRef } from "react-native-video";
import GestureRecognizer from "react-native-swipe-gestures";
import { useFocusEffect } from "@react-navigation/native";

// custom
import { CustomImage, CustomLoading } from "../../../Components";
import { COLORS, SIZES } from "../../../Constants";
import { Timer } from "../../../Utils/commonUtils";
import { StoriesScreenProps } from "../../../Defs";
import { styles } from "./styles";

const StoriesScreen: React.FC<StoriesScreenProps> = ({ navigation, route }) => {
  // constants
  const allUserData = route.params.allStoryData;

  // state use
  const [userIndex, setUserIndex] = useState(route.params.index);
  const [index, setIndex] = useState(0);
  const stories = allUserData[userIndex].stories;

  // ref use
  const videoRef = useRef<VideoRef>(null);

  // focus effect use
  useFocusEffect(() => () => storyTimer.clear());

  // functions
  const goNext = () => {
    if (index < stories.length - 1) {
      setIndex(index + 1);
    } else {
      if (userIndex < allUserData.length - 1) {
        setUserIndex(userIndex + 1);
      } else {
        navigation.goBack();
      }
    }
  };
  const storyTimer = new Timer(goNext);

  return (
    <View style={styles.parent} key={`${userIndex}-${index}`}>
      <GestureRecognizer
        onSwipeDown={() => {
          navigation.goBack();
        }}
        style={{ flex: 1 }}
        onSwipeLeft={() => {
          if (userIndex < allUserData.length - 1) {
            setUserIndex(userIndex + 1);
            setIndex(0);
          }
        }}
        onSwipeRight={() => {
          if (userIndex > 0) {
            setUserIndex(userIndex - 1);
            setIndex(0);
          }
        }}
      >
        <View
          style={{
            height: SIZES.height,
            width: SIZES.width,
            position: "absolute",
            flexDirection: "row",
            zIndex: 1,
          }}
        >
          <Pressable
            style={{
              height: SIZES.height,
              width: SIZES.width / 2,
            }}
            onPress={() => {
              if (index > 0) {
                setIndex(index - 1);
              }
            }}
          />
          <Pressable
            style={{ height: SIZES.height, width: SIZES.width / 2 }}
            onPress={() => {
              if (index < stories.length - 1) {
                setIndex(index + 1);
              }
            }}
          />
        </View>
        {stories[index].storyType.includes("video") ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CustomLoading
              size={"large"}
              style={{ position: "absolute" }}
              color={COLORS.PRIMARY.PURPLE}
            />
            <Video
              source={{
                uri: stories[index].storyUrl,
              }}
              ref={videoRef}
              style={{
                minWidth: SIZES.width,
                minHeight: SIZES.height,
              }}
              onLoad={({ duration }) =>
                storyTimer.start(duration < 15 ? duration * 1000 - 300 : 15000)
              }
              resizeMode="cover"
            />
          </View>
        ) : (
          <CustomImage
            source={{ uri: stories[index].storyUrl }}
            parentStyle={{
              width: SIZES.width,
              height: SIZES.height,
            }}
            activityIndicatorSize={"large"}
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

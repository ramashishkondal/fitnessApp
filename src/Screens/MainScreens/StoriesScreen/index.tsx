// libs
import React, { useRef, useState } from "react";

// 3rd party
import Video, { VideoRef } from "react-native-video";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

// custom
import { Timer } from "../../../Utils/commonUtils";
import { COLORS, SIZES } from "../../../Constants";
import { styles } from "./styles";
import { StoriesScreenProps } from "../../../Defs";
import { useFocusEffect } from "@react-navigation/native";
import { CustomImage, CustomLoading } from "../../../Components";
import { View } from "react-native";

const StoriesScreen: React.FC<StoriesScreenProps> = ({ navigation, route }) => {
  // constants
  const storyTimer = new Timer(() => navigation.pop());
  const stories = route.params.stories.filter(() => true);

  const [index, setIndex] = useState(0);

  // ref use
  const videoRef = useRef<VideoRef>(null);

  // gestures
  const longPress = Gesture.LongPress();
  longPress
    .onStart(() => {
      console.log("gesture detected");
      videoRef.current?.pause();
      storyTimer.pause();
    })
    .onFinalize(() => {
      videoRef.current?.resume();
      storyTimer.resume();
    });

  // focus effect use
  useFocusEffect(() => () => storyTimer.clear());
  return (
    <View style={styles.parent}>
      <GestureDetector gesture={longPress}>
        {stories[index].storyType.includes("video") ? (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <CustomLoading
              size={"large"}
              style={{ position: "absolute" }}
              color={COLORS.PRIMARY.DARK_GREY}
            />
            <Video
              source={{
                uri: stories[index].storyUrl,
              }}
              ref={videoRef}
              style={{
                // position: "absolute",
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
            parentStyle={{ width: SIZES.width, height: SIZES.height }}
            activityIndicatorSize={"large"}
            handleLoadEnd={() => {
              storyTimer.start(10000);
            }}
          />
        )}
      </GestureDetector>
    </View>
  );
};

export default StoriesScreen;

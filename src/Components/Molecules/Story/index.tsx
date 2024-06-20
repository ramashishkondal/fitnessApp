// libs
import React from "react";
import { TouchableOpacity } from "react-native";

// 3rd party
import { useNavigation } from "@react-navigation/native";

// custom
import { styles } from "./styles";
import { StoryProps } from "./types";
import { AppNavigationProps } from "../../../Defs/navigators";
import { useAppSelector } from "../../../Redux/Store";
import { CustomImage } from "../../Atoms";
import { COLORS } from "../../../Constants";

const Story: React.FC<StoryProps> = ({ allStoryData, index }) => {
  const navigation = useNavigation<AppNavigationProps>();

  // redux use
  const { storiesWatched } = useAppSelector((state) => state.User.data);

  // functions
  const goToStoriesScreen = () =>
    navigation.push("StoriesScreen", { allStoryData, index });
  console.log("storeii wat", storiesWatched);
  return (
    <TouchableOpacity
      style={[
        styles.parent,
        storiesWatched.includes(allStoryData[index].storyByUserId)
          ? { borderColor: COLORS.SECONDARY.GREY }
          : null,
      ]}
      onPress={goToStoriesScreen}
    >
      <CustomImage
        source={{ uri: allStoryData[index].userPhoto }}
        imageStyle={styles.photo}
      />
    </TouchableOpacity>
  );
};

export default Story;

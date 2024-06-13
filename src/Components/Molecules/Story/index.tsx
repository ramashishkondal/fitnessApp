// libs
import React from "react";
import { Image, TouchableOpacity } from "react-native";

// 3rd party
import { useNavigation } from "@react-navigation/native";

// custom
import { styles } from "./styles";
import { StoryProps } from "./types";
import { AppNavigationProps } from "../../../Defs/navigators";

const Story: React.FC<StoryProps> = ({ photo, stories }) => {
  const navigation = useNavigation<AppNavigationProps>();

  const goToStoriesScreen = () => navigation.push("StoriesScreen", { stories });

  return (
    <TouchableOpacity style={styles.parent} onPress={goToStoriesScreen}>
      <Image source={{ uri: photo }} style={styles.photo} />
    </TouchableOpacity>
  );
};

export default Story;

// libs
import React from "react";
import { Image, TouchableOpacity } from "react-native";

// custom
import { styles } from "./styles";
import { StoryProps } from "./types";

const Story: React.FC<StoryProps> = ({ photo, onPress }) => {
  return (
    <TouchableOpacity style={styles.parent} onPress={onPress}>
      <Image source={{ uri: photo }} style={styles.photo} />
    </TouchableOpacity>
  );
};

export default Story;

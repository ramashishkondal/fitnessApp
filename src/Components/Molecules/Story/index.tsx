// libs
import React from "react";
import { Image, TouchableOpacity } from "react-native";

// custom
import { styles } from "./styles";
import { StoryProps } from "./types";

const Story = ({ photo }: StoryProps) => {
  return (
    <TouchableOpacity style={styles.parent}>
      <Image source={{ uri: photo }} style={styles.photo} />
    </TouchableOpacity>
  );
};

export default Story;

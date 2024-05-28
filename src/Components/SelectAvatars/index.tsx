// libs
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";

// custom
import { AVATARS } from "../../Constants/icons";
import { styles } from "./styles";
import { RFValue } from "react-native-responsive-fontsize";

const AvatarArray = Object.values(AVATARS).map((val) => val());
const SelectAvatars = () => {
  return (
    <FlatList
      data={AvatarArray}
      renderItem={({ item }) => <Avatar item={item} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ maxHeight: RFValue(100) }}
    />
  );
};

const Avatar = ({ item, setSelected }: any) => {
  return <TouchableOpacity style={styles.avatarCtr}>{item}</TouchableOpacity>;
};

export default SelectAvatars;

// libs
import React from "react";
import { FlatList, ListRenderItem } from "react-native";

// custom
import { AVATARS } from "../../Constants/icons";
import Avatar from "../Avatar";
import { styles } from "./styles";

const AvatarArray = Object.values(AVATARS).map((val) => val());
const SelectAvatars = () => {
  const renderItem: ListRenderItem<any> = ({ item }) => <Avatar item={item} />;
  return (
    <FlatList
      data={AvatarArray}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.flatListSyle}
    />
  );
};

export default SelectAvatars;

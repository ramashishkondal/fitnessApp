// libs
import React from "react";
import { View, FlatList, Text, ListRenderItem } from "react-native";

//custom
import { CustomButton, InterestItem } from "../../../Components";
import { STRING } from "../../../Constants";
import { styles } from "./styles";
import { INTERESTS } from "../../../Constants/icons";
import { AddInterestsProps } from "../../../Defs";

const iconSize = {
  width: 35,
  height: 35,
};

const INTERESETS = [
  { title: "Fashion", icon: INTERESTS.Fashion(iconSize) },
  { title: "Organic", icon: INTERESTS.Organic(iconSize) },
  { title: "Meditation", icon: INTERESTS.Meditation(iconSize) },
  { title: "Fitness", icon: INTERESTS.Fitness(iconSize) },
  { title: "Smoke Free", icon: INTERESTS.SmokeFree(iconSize) },
  { title: "Sleep", icon: INTERESTS.Sleep(iconSize) },
  { title: "Health", icon: INTERESTS.Health(iconSize) },
  { title: "Running", icon: INTERESTS.Running(iconSize) },
  { title: "Vegan", icon: INTERESTS.Vegan(iconSize) },
];

const renderItem: ListRenderItem<{ title: string; icon: any }> = ({ item }) => (
  <InterestItem title={item.title} icon={item.icon} />
);
const AddInterests = ({ navigation }: AddInterestsProps) => {
  const goToAddGender = () => {
    navigation.push("AddGender");
  };
  return (
    <View style={styles.parent}>
      <Text style={styles.titleText}>{STRING.ADD_INTERESTS.TITLE}</Text>
      <FlatList
        data={INTERESETS}
        renderItem={renderItem}
        numColumns={3}
        style={styles.flatListStyle}
      />
      <View style={styles.buttonStyle}>
        <CustomButton
          title={STRING.ADD_INTERESTS.BUTTON_TEXT}
          onPress={goToAddGender}
        />
      </View>
    </View>
  );
};

export default AddInterests;

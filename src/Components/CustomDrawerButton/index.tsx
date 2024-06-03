import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { appDrawerParamList } from "../../Defs/navigators";
import { ICONS } from "../../Constants";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { styles } from "./styles";

const CustomDrawerButton = () => {
  const navigation = useNavigation<DrawerNavigationProp<appDrawerParamList>>();
  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <TouchableOpacity onPress={openDrawer} style={styles.parent}>
      {ICONS.Drawer({ width: 25, height: 25 })}
    </TouchableOpacity>
  );
};

export default CustomDrawerButton;

// libs
import React from "react";
import { Text, View } from "react-native";

// custom
import { styles } from "./style";
import { ICONS } from "../../../Constants";

const size = {
  width: 40,
  height: 40,
};
const DetailsCompleted = () => {
  return (
    <View style={styles.parent}>
      <View>
        {ICONS.Logo(size)}
        <Text></Text>
        <Text></Text>
      </View>
    </View>
  );
};

export default DetailsCompleted;

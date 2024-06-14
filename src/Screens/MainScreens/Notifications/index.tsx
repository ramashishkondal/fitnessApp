// libs
import React from "react";
import { View } from "react-native";

// custom
import { styles } from "./styles";
import { DescriptionText, HeadingText } from "../../../Components";
import { SIZES } from "../../../Constants";

const Notifications = () => {
  return (
    <View style={styles.parent}>
      <HeadingText
        text="Notifications"
        textStyle={{
          fontSize: SIZES.fontH4,
          textAlign: "left",
          marginHorizontal: 16,
        }}
      />
      <DescriptionText
        text="2 unread Notifications"
        textStyle={{ textAlign: "left", marginHorizontal: 16 }}
      />
    </View>
  );
};

export default Notifications;

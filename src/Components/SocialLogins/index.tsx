import React from "react";
import { TouchableOpacity, View } from "react-native";
import { SPACING } from "../../Constants/commonStyles";
import { ICONS } from "../../Constants/icons";
import { styles } from "./styles";

const iconSize = 17;
const SocialLogins = () => {
  return (
    <View style={[styles.logoCtr, SPACING.mt3]}>
      <TouchableOpacity style={styles.logos}>
        {ICONS.TwitterLogo({ width: iconSize, height: iconSize })}
      </TouchableOpacity>
      <TouchableOpacity style={styles.logos}>
        {ICONS.FacebookLogo({ width: iconSize, height: iconSize })}
      </TouchableOpacity>
      <TouchableOpacity style={styles.logos}>
        {ICONS.GoogleLogo({
          width: iconSize,
          height: iconSize,
          color: "#4E4BC7",
        })}
      </TouchableOpacity>
    </View>
  );
};

export default SocialLogins;

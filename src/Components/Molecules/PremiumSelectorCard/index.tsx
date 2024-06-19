import React from "react";
import { Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox/build/dist/BouncyCheckbox";
import { COLORS, SIZES } from "../../../Constants";
import { PremiumSelectorCardProps } from "./types";
import { FONT_FAMILY } from "../../../Constants/commonStyles";

const PremiumSelectorCard: React.FC<PremiumSelectorCardProps> = ({
  priceText,
  priceIntervalTime,
  isChecked,
  setIsChecked,
}) => {
  // functions
  const handleOnPress = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 8,
        // width: SIZES.width,
        paddingVertical: 20,
        backgroundColor: COLORS.PRIMARY.GREY,
        borderRadius: SIZES.rounding2,
        marginTop: 24,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <BouncyCheckbox
          size={25}
          fillColor={COLORS.PRIMARY.PURPLE}
          unFillColor={COLORS.SECONDARY.WHITE}
          innerIconStyle={{ borderColor: COLORS.SECONDARY.WHITE }}
          onPress={handleOnPress}
          isChecked={isChecked}
          disableText
        />
        <View style={{ marginLeft: 16 }}>
          <Text
            style={{ fontFamily: FONT_FAMILY.BOLD, fontSize: SIZES.font15 }}
          >
            ${priceText}
            <Text
              style={{ fontFamily: FONT_FAMILY.MEDIUM, fontSize: SIZES.font12 }}
            >
              /{priceIntervalTime}
            </Text>
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: COLORS.PRIMARY.LIGHT_PURPLE,
          paddingVertical: 10,
          borderRadius: 16,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontFamily: FONT_FAMILY.BOLD,
            color: COLORS.PRIMARY.PURPLE,
            fontSize: SIZES.font13,
          }}
        >
          Free Trial
        </Text>
      </View>
    </View>
  );
};

export default PremiumSelectorCard;

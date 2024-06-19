import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SettingsCardProps } from "./types";
import { COLORS, FONT_FAMILY, SIZES } from "../../../Constants/commonStyles";
import { Switch } from "react-native-switch";

const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  hasSwitch = false,
  onPress,
}) => {
  const [switchActive, setSwitchActive] = useState(false);
  return (
    <Pressable
      style={{
        borderBottomWidth: 1,
        borderColor: COLORS.SECONDARY.GREY,
        paddingVertical: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <Text style={{ fontFamily: FONT_FAMILY.MEDIUM, fontSize: SIZES.font13 }}>
        {title}
      </Text>
      {hasSwitch ? (
        <View
          style={[
            {
              borderWidth: 2,
              borderRadius: 100,
              borderColor: COLORS.PRIMARY.LIGHT_GREY,
              marginRight: 16,
            },
            switchActive
              ? null
              : {
                  borderColor: "#E8E8E8",
                },
          ]}
        >
          <Switch
            value={switchActive}
            onValueChange={(val) => setSwitchActive(val)}
            disabled={false}
            activeText={"On"}
            inActiveText={"Off"}
            circleSize={32}
            barHeight={32}
            circleBorderWidth={2}
            circleBorderActiveColor="#4CD965"
            circleBorderInactiveColor={COLORS.PRIMARY.LIGHT_GREY}
            backgroundActive={"#4CD965"}
            backgroundInactive={COLORS.PRIMARY.LIGHT_GREY}
            circleActiveColor={COLORS.SECONDARY.WHITE}
            circleInActiveColor={"#ffff"}
            changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
            innerCircleStyle={{
              alignItems: "center",
              justifyContent: "center",
              shadowRadius: 3,
              shadowColor: "grey",
              shadowOpacity: 0.3,
              shadowOffset: { height: 4, width: 1 },
            }} // style for inner animated circle for what you (may) be rendering inside the circle
            renderActiveText={false}
            renderInActiveText={false}
            switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
            switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
            switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
            switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
          />
        </View>
      ) : null}
    </Pressable>
  );
};

export default SettingsCard;

import { Dimensions, StyleSheet } from "react-native";
import DeviceInfo from "react-native-device-info";
import { RFValue } from "react-native-responsive-fontsize";

export const COLORS = {
  PRIMARY: {
    GREY: "#F4F6FA",
    PURPLE: "#7265E3",
    LIGHT_PURPLE: "#E1DDF5",
    DARK_GREY: "#ECECEC",
    LIGHT_GREY: "#F4F6FA",
  },
  SECONDARY: {
    GREY: "#B0B1C8",
    WHITE: "#FFFFFF",
    RED: "#ff0033",
    ORANGE: "#F7A56D",
    CYAN: "#44C7BC",
    LIGHT_GREY: "#DCDDE0",
    LIGHT_GREY_2: "#F1EFFA",
  },
};

export const FONT_FAMILY = {
  REGULAR: "NotoSans-Regular",
  MEDIUM: "NotoSans-Medium",
  SEMI_BOLD: "NotoSans-SemiBold",
  BOLD: "NotoSans-Bold",
  EXTRA_BOLD: "NotoSans-ExtraBold",
};

export const ANIMATIONS = {
  sizeNormal: 1,
  sizeIncrease1: 1.05,
  sizeIncrease2: 1.1,
  sizeIncrease3: 1.15,
};

const HEADER_CONST = DeviceInfo.isTablet() ? RFValue(11) : RFValue(13);
export const SIZES = {
  icon: DeviceInfo.isTablet() ? RFValue(12) : RFValue(13),
  spacing: DeviceInfo.isTablet() ? RFValue(7) : RFValue(8),
  rounding0: 3,
  rounding: 5,
  rounding2: 10,
  rounding3: 25,
  width: Dimensions.get("screen").width,
  height: Dimensions.get("screen").height,
  font9: DeviceInfo.isTablet() ? RFValue(8) : RFValue(9.75),
  font10: DeviceInfo.isTablet() ? RFValue(9) : RFValue(10),
  font11: DeviceInfo.isTablet() ? RFValue(10) : RFValue(11),
  font12: DeviceInfo.isTablet() ? RFValue(11) : RFValue(12.75),
  font13: DeviceInfo.isTablet() ? RFValue(12) : RFValue(13.1),
  font14: DeviceInfo.isTablet() ? RFValue(13) : RFValue(14),
  font15: DeviceInfo.isTablet() ? RFValue(13) : RFValue(15),
  font17: DeviceInfo.isTablet() ? RFValue(16) : RFValue(17),
  font18: DeviceInfo.isTablet() ? RFValue(17) : RFValue(18),
  font24: DeviceInfo.isTablet() ? RFValue(23) : RFValue(24),

  fontH1: RFValue(HEADER_CONST * 2),
  fontH2: RFValue(HEADER_CONST * 1.8),
  fontH3: RFValue(HEADER_CONST * 1.65),
  fontH4: RFValue(HEADER_CONST * 1.5),
  fontH5: RFValue(HEADER_CONST * 1.2),
  fontH6: RFValue(HEADER_CONST * 1.0),
  fontH7: RFValue(HEADER_CONST * 0.9),
  fontBold0: "bold" as const,
  fontBold1: "600" as const,
  fontBold2: "500" as const,
};

export const SPACING = StyleSheet.create({
  m1: {
    margin: 8,
  },
  m2: {
    margin: 16,
  },
  m3: {
    margin: 24,
  },
  m4: {
    margin: 32,
  },
  m5: {
    margin: 40,
  },
  mb1: { marginBottom: 8 },
  mb2: { marginBottom: 16 },
  mb3: { marginBottom: 24 },
  mb4: { marginBottom: 32 },
  mb5: { marginBottom: 40 },
  p1: {
    padding: 8,
  },
  p2: {
    padding: 16,
  },
  p3: {
    padding: 24,
  },
  mV1: {
    marginVertical: 8,
  },
  mV2: {
    marginVertical: 16,
  },
  mV3: {
    marginVertical: 24,
  },
  mt1: {
    marginTop: 8,
  },
  mt2: {
    marginTop: 16,
  },
  mt3: {
    marginTop: 24,
  },
  mt4: {
    marginTop: 30,
  },
  mt5: {
    marginTop: 38,
  },
  mtMedium: {
    marginTop: 54,
  },
  mtLarge: {
    marginTop: 104,
  },
  mtXLarge: {
    marginTop: 128,
  },
  mh1: {
    marginHorizontal: 8,
  },
  mh2: {
    marginHorizontal: 40,
  },
  mh3: {
    marginHorizontal: 50,
  },
  mhMedium: {
    marginHorizontal: 20,
  },
});

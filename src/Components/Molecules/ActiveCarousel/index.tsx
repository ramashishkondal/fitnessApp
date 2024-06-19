import React from "react";
import { View } from "react-native";
import { ActiveCarouselProps } from "./types";
import { COLORS } from "../../../Constants";

const ActiveCarousel: React.FC<ActiveCarouselProps> = ({
  activeIndex,
  length,
}) => {
  const arr = Array(length)
    .fill(-1)
    .map((_val, index) => (
      <View
        key={index}
        style={[
          {
            backgroundColor: "rgba(244,246,250,0.5)",
            width: 6,
            height: 6,
            borderRadius: 200,
          },
          activeIndex === index
            ? {
                backgroundColor: COLORS.SECONDARY.WHITE,
                width: 8,
                height: 8,
              }
            : null,
        ]}
      />
    ));
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {arr}
    </View>
  );
};

export default ActiveCarousel;

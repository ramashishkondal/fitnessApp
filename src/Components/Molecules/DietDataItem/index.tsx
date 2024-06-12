// libs
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

// custom
import { ICONS } from "../../../Constants";
import { DietDataItemProps } from "./types";
import { styles } from "./styles";

const DietDataItem = ({ item }: DietDataItemProps) => {
  const handleClose = () => {
    console.log("close pressed", item.title);
  };
  return (
    <View style={styles.parent}>
      <Text style={styles.titleText}>{item.title}</Text>
      {item.data.map((val, index, arr) => {
        return (
          <View
            style={[
              styles.childCtr,
              index !== 0 && index !== arr.length
                ? { borderTopWidth: 1.5 }
                : null,
            ]}
            key={index}
          >
            <View style={styles.titleCtr}>
              <Text style={styles.productTitleText}>{val.productTitle}</Text>
              <Text style={styles.quantityText}>{val.initialQuantity}</Text>
            </View>
            <View>
              <Text style={styles.caloriesText}>{val.caloriesConsumed}</Text>
            </View>
          </View>
        );
      })}
      <TouchableOpacity
        style={{ position: "absolute", top: 10, right: 10 }}
        onPress={handleClose}
      >
        <View>{ICONS.Close({ width: 35, height: 35 })}</View>
      </TouchableOpacity>
    </View>
  );
};

export default DietDataItem;

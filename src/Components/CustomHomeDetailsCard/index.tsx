// libs
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

// custom
import { styles } from "./styles";

type CustomHomeDetailsCardProps = {
  title: string;
  handleOnPress: () => void;
};
const CustomHomeDetailsCard = ({
  title,
  handleOnPress,
}: CustomHomeDetailsCardProps) => {
  return (
    <View style={styles.parent}>
      <TouchableOpacity style={styles.allDetailsCtr} onPress={handleOnPress}>
        {/* icons - fullCtr */}
        <View style={styles.iconCtr}>
          <Text>ICON</Text>
        </View>
        <View style={styles.childCtr}>
          {/* fullCtr */}
          <View style={styles.detailsCtr}>
            {/* line - statsCtr */}
            <View style={styles.upperCtr}>
              {/* stats - On/warning */}
              <View style={styles.textCtr}>
                {/* statsCtr */}
                <Text>{title}</Text>
                <Text>100/900</Text>
              </View>
              <View style={styles.buttonCtr}>
                <Text>On</Text>
              </View>
            </View>
            <View style={styles.lineCtr}>
              <Text>--------</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomHomeDetailsCard;

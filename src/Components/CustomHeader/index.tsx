import React from "react";
import { Dimensions, TouchableOpacity, View, SafeAreaView } from "react-native";

// types
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { ICONS } from "../../Constants/icons";
import { styles } from "./styles";

const CustomHeader = (props: NativeStackHeaderProps) => {
  const goBack = () => {
    props.navigation.goBack();
  };
  return (
    <SafeAreaView
      style={[
        {
          height: Dimensions.get("screen").height / 4.5,
        },
        styles.parent,
      ]}
    >
      <View style={styles.Container}>
        {props.navigation.canGoBack() ? (
          <TouchableOpacity style={styles.backCtr} onPress={goBack}>
            {ICONS.LeftArrow({ width: 17, height: 17 })}
          </TouchableOpacity>
        ) : null}
        <View style={styles.logoCtr}>
          {ICONS.Logo({ width: 40, height: 40 })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const Header = (props: NativeStackHeaderProps) => <CustomHeader {...props} />;

export default Header;

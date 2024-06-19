// libs
import React, { useEffect } from "react";
import { View } from "react-native";

// 3rd party
import auth from "@react-native-firebase/auth";

// custom
import { CustomLoading } from "../../../Components";
import { COLORS } from "../../../Constants";
import { styles } from "./styles";

const LogOut = () => {
  useEffect(() => {
    auth().signOut();
  }, []);
  return (
    <View style={styles.parent}>
      <CustomLoading color={COLORS.PRIMARY.PURPLE} size={"large"} />
    </View>
  );
};

export default LogOut;

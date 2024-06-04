// libs
import React, { useEffect } from "react";
import { View } from "react-native";
import auth from "@react-native-firebase/auth";

// custom
import { styles } from "./styles";

const LogOut = () => {
  useEffect(() => {
    auth().signOut();
  }, []);
  return <View style={styles.parent}></View>;
};

export default LogOut;

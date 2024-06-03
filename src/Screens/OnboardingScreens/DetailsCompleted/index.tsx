// libs
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

// custom
import { styles } from "./style";
import { COLORS, ICONS, STRING } from "../../../Constants";
import { storeUserData, createUser } from "../../../Utils/userUtils";
import { useAppSelector } from "../../../Redux/Store";

const size = {
  width: 40,
  height: 40,
};
const arrowSize = {
  width: 30,
  height: 30,
};
const DetailsCompleted = () => {
  const { data } = useAppSelector((state) => state.User);
  const { password, ...user } = data;
  const handleSubmit = async () => {
    if (user.email !== null && password !== "") {
      const userCredentials = await createUser(user.email, password);
      if (userCredentials !== undefined) {
        user.id = userCredentials.user.uid;
        storeUserData(user, userCredentials);
      }
    }
  };
  return (
    <View style={styles.parent}>
      <View style={styles.childCtr}>
        <View style={styles.logoCtr}>{ICONS.Logo(size)}</View>
        <Text style={styles.titleText}>{STRING.DETAILS_COMPLETED.TITLE}</Text>
        <Text style={styles.titleDescriptionText}>
          {STRING.DETAILS_COMPLETED.TITLE_DESCRIPTION}
        </Text>
        <TouchableOpacity style={styles.arrowCtr} onPress={handleSubmit}>
          {ICONS.DoubleArrow({ color: COLORS.SECONDARY.WHITE, ...arrowSize })}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsCompleted;

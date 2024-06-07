// libs
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import storage from "@react-native-firebase/storage";

// custom
import { useAppDispatch, useAppSelector } from "../../../Redux/Store";
import { storeUserData, createUser } from "../../../Utils/userUtils";
import { COLORS, ICONS, STRING } from "../../../Constants";
import { styles } from "./style";
import { updateUserData } from "../../../Redux/Reducers/currentUser";

const size = {
  width: 40,
  height: 40,
};
const arrowSize = {
  width: 30,
  height: 30,
};
const DetailsCompleted = () => {
  const {
    data: { password, ...user },
  } = useAppSelector((state) => state.User);
  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    if (user.email !== null && password !== "") {
      const userCredentials = await createUser(user.email, password);

      const reference = storage().ref(
        "media/" + userCredentials?.user.uid + "/" + "photo"
      );

      await reference.putFile(user.photo!);
      const url = await reference.getDownloadURL();
      console.log("the url is -", url);
      dispatch(updateUserData({ photo: url }));
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

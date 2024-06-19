// libs
import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";

// 3rd party
import storage from "@react-native-firebase/storage";

// custom
import { useAppDispatch, useAppSelector } from "../../../Redux/Store";
import { CustomLoading } from "../../../Components";
import {
  storeUserData,
  createUser,
  sendNotification,
} from "../../../Utils/userUtils";
import { COLORS, ICONS, STRING } from "../../../Constants";
import { styles } from "./style";
import { Timestamp } from "@react-native-firebase/firestore";
import { updateUserData } from "../../../Redux/Reducers/currentUser";
import { resetHealthData } from "../../../Redux/Reducers/health";
import { resetMealData } from "../../../Redux/Reducers/dailyMeal";

const logoSize = {
  width: 40,
  height: 40,
};
const arrowSize = {
  width: 30,
  height: 30,
};
const DetailsCompleted = () => {
  // state use
  const [isLoading, setIsLoading] = useState(false);

  // redux use
  const {
    data: { password, ...user },
  } = useAppSelector((state) => state.User);
  const dispatch = useAppDispatch();

  // functions
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (password !== null) {
        const userCredentials = await createUser(user.email, password);
        const reference = storage().ref(
          "media/profilePictures" + userCredentials?.user.uid + "/" + "photo"
        );
        await reference.putFile(user.photo);
        const url = await reference.getDownloadURL();
        if (userCredentials !== undefined) {
          user.photo = url;
          user.id = userCredentials.user.uid;
          await storeUserData(user, user.id);
          dispatch(updateUserData({ id: userCredentials.user.uid }));
          dispatch(resetHealthData());
          dispatch(resetMealData());
          await sendNotification(
            {
              createdOn: Timestamp.fromDate(new Date()),
              message: "You have successfully registered on FitnessApp !",
              userName: "",
              userPhoto: "https://www.svgrepo.com/show/311650/pencil-ruler.svg",
              isUnread: true,
            },
            userCredentials.user.uid
          );
        }
      }
    } catch (e) {
      console.log("error in creating user - ", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.parent}>
      <View style={styles.childCtr}>
        <View style={styles.logoCtr}>{ICONS.Logo(logoSize)}</View>
        <Text style={styles.titleText}>{STRING.DETAILS_COMPLETED.TITLE}</Text>
        <Text style={styles.titleDescriptionText}>
          {STRING.DETAILS_COMPLETED.TITLE_DESCRIPTION}
        </Text>
        <TouchableOpacity style={styles.arrowCtr} onPress={handleSubmit}>
          {isLoading ? (
            <CustomLoading color={COLORS.SECONDARY.WHITE} />
          ) : (
            ICONS.DoubleArrow({ color: COLORS.SECONDARY.WHITE, ...arrowSize })
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsCompleted;

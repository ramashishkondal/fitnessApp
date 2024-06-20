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
        let url = "";
        if (RegExp("avatar+").test(user.photo)) {
          url = await storage()
            .ref("media/Avatars/" + user.photo + ".jpg")
            .getDownloadURL();
        } else {
          const reference = storage().ref(
            "media/profilePictures/" + userCredentials?.user.uid + "/" + "photo"
          );
          await reference.putFile(user.photo);
          url = await reference.getDownloadURL();
        }
        if (userCredentials !== undefined) {
          user.id = userCredentials.user.uid;
          dispatch(
            updateUserData({
              id: userCredentials.user.uid,
              healthData: [],
              notifications: [],
              photo: url,
            })
          );
          dispatch(resetHealthData());
          dispatch(resetMealData());
          await storeUserData(user, user.id);
          await sendNotification(
            {
              createdOn: Timestamp.fromDate(new Date()),
              message: "You have successfully registered on FitnessApp !",
              userName: "",
              userPhoto:
                "https://firebasestorage.googleapis.com/v0/b/fitnessapp-44851.appspot.com/o/media%2FUtils%2Fpencil-ruler-svgrepo-com.jpg?alt=media&token=5ea84d1a-e9ff-4b55-aa3d-8c0522228133",
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

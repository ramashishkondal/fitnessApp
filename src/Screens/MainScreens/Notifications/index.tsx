// libs
import React, { useEffect, useState } from "react";
import { View } from "react-native";

// 3rd party
import firestore from "@react-native-firebase/firestore";

// custom
import { styles } from "./styles";
import {
  DescriptionText,
  HeadingText,
  Notification,
} from "../../../Components";
import { SIZES } from "../../../Constants";
import { firebaseDB } from "../../../Utils/userUtils";
import { useAppSelector } from "../../../Redux/Store";
import { NotificationsData } from "../../../Defs/user";
import { FlatList } from "react-native-gesture-handler";
import { getTimePassed } from "../../../Utils/commonUtils";

const Notifications: React.FC = () => {
  // state ues
  const [notificationsData, setNotificationsData] = useState<
    NotificationsData
  >();

  // redux use
  const { id: userId } = useAppSelector((state) => state.User.data);

  // effect use
  useEffect(() => {
    const unsubscribe = firestore()
      .collection(firebaseDB.collections.users)
      .doc(firebaseDB.documents.users.byId)
      .onSnapshot((snapshot) => {
        setNotificationsData(
          snapshot.get(`${userId}.notifications`) as NotificationsData
        );
      });
    return () => unsubscribe();
  }, [userId]);

  return (
    <View style={styles.parent}>
      <HeadingText
        text="Notifications"
        textStyle={{
          fontSize: SIZES.fontH4,
          textAlign: "left",
          marginHorizontal: 16,
        }}
      />
      <DescriptionText
        text="2 unread Notifications"
        textStyle={{ textAlign: "left", marginHorizontal: 16 }}
      />
      <View style={{ backgroundColor: "white", marginVertical: 32 }}>
        <FlatList
          data={notificationsData}
          renderItem={({ item }) => (
            <Notification
              isUnread={true}
              notificationText={item.message}
              timeAgo={getTimePassed(item.createdOn.seconds * 1000)}
              userName={item.userName}
              userPhoto={item.userPhoto}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Notifications;

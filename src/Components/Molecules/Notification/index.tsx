import React from "react";
import { Text, View } from "react-native";
import { COLORS } from "../../../Constants";
import { NotificationProps } from "./types";
import { DescriptionText } from "../../Atoms";

const Notification: React.FC<NotificationProps> = ({
  notificationText,
  timeAgo,
}) => {
  return (
    <View style={{ backgroundColor: COLORS.SECONDARY.WHITE }}>
        <
      <Text>{notificationText}</Text>
      <DescriptionText text={timeAgo} />
    </View>
  );
};

export default Notification;

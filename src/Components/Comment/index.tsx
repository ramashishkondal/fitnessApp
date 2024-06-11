// libs
import React from "react";
import { View, Text, Image } from "react-native";
import { CommentProps } from "./types";

// custom
import { styles } from "./styles";

const Comment = ({
  comment: { userPhoto, userName, createdOn, comment },
}: CommentProps) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.userInfoCtr}>
        <Image source={{ uri: userPhoto }} style={styles.userPhoto} />
        <View style={styles.userTextCtr}>
          <Text style={styles.userNameText}>{userName}</Text>
          <Text>{createdOn}</Text>
          <Text>{comment}</Text>
        </View>
      </View>
    </View>
  );
};

export default Comment;

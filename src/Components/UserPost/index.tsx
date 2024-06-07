import React from "react";
import { Text, View, Image } from "react-native";
import { styles } from "./styles";
import { UserPostProps } from "./types";
import { ICONS } from "../../Constants";

const iconSize = {
  width: 14,
  height: 14,
};

const UserPost = ({
  postData: {
    caption,
    userName,
    noOfComments,
    noOfLikes,
    photo,
    postedOn,
    userPhoto,
  },
}: UserPostProps) => {
  return (
    <View style={styles.parent}>
      <View style={styles.userInfoCtr}>
        <Image source={{ uri: userPhoto }} style={styles.userPhoto} />
        <View style={styles.userTextCtr}>
          <Text>{userName}</Text>
          <Text>{postedOn}</Text>
        </View>
      </View>
      <Text style={{ marginVertical: 10 }}>{caption}</Text>
      <Image source={{ uri: photo }} style={styles.photo} />
      <View style={styles.likesAndCommentsCtr}>
        {ICONS.HeartLike(iconSize)}
        <Text style={styles.likesText}>{noOfLikes}</Text>
        {ICONS.Comment(iconSize)}
        <Text style={styles.likesText}>{noOfComments}</Text>
      </View>
    </View>
  );
};

export default UserPost;

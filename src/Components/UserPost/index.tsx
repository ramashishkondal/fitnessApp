import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import { styles } from "./styles";
import { UserPostProps } from "./types";
import { ICONS } from "../../Constants";
import { TouchableOpacity } from "react-native-gesture-handler";

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
  handleCommentsPress,
  handleLikesPress,
}: UserPostProps) => {
  console.log(userPhoto);
  return (
    <View style={styles.parent}>
      <View style={styles.userInfoCtr}>
        <Image source={{ uri: userPhoto }} style={styles.userPhoto} />
        <View style={styles.userTextCtr}>
          <Text>{userName}</Text>
          <Text>{postedOn}</Text>
        </View>
      </View>
      <Text style={styles.captionText}>{caption}</Text>
      <Image source={{ uri: photo }} style={styles.photo} />
      <View style={styles.likesAndCommentsCtr}>
        <TouchableOpacity onPress={handleLikesPress}>
          {ICONS.HeartLike(iconSize)}
        </TouchableOpacity>
        <Text style={styles.likesText}>{noOfLikes}</Text>
        <TouchableOpacity onPress={handleCommentsPress}>
          {ICONS.Comment(iconSize)}
        </TouchableOpacity>
        <Text style={styles.likesText}>{noOfComments}</Text>
      </View>
    </View>
  );
};

export default UserPost;

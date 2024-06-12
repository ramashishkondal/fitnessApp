// libs
import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";

// custom
import { styles } from "./styles";
import { UserPostProps } from "./types";
import { COLORS, ICONS } from "../../../Constants";

const icon = {
  width: 16,
  height: 16,
  color: COLORS.SECONDARY.GREY,
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
    isLiked,
  },
  handleCommentsPress,
  handleLikesPress,
}: UserPostProps) => {
  return (
    <View style={styles.parent}>
      <View style={styles.userInfoCtr}>
        <Image source={{ uri: userPhoto }} style={styles.userPhoto} />
        <View style={styles.userTextCtr}>
          <Text style={styles.userNameText}>{userName}</Text>
          <Text>{postedOn}</Text>
        </View>
      </View>
      <Text style={styles.captionText}>{caption}</Text>
      <Image source={{ uri: photo }} style={styles.photo} />
      <View style={styles.likesAndCommentsCtr}>
        <TouchableOpacity onPress={handleLikesPress} style={styles.likeCtr}>
          {ICONS.HeartLike({
            ...icon,
            color: isLiked ? COLORS.PRIMARY.PURPLE : COLORS.SECONDARY.GREY,
          })}
          <Text style={styles.likesText}>{noOfLikes}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCommentsPress}
          style={styles.commentCtr}
        >
          {ICONS.Comment(icon)}
          <Text style={styles.likesText}>{noOfComments}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserPost;

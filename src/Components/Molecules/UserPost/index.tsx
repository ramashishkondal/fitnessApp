// libs
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

// custom
import { styles } from "./styles";
import { UserPostProps } from "./types";
import { COLORS, ICONS, SIZES } from "../../../Constants";
import { CustomImage, DescriptionText } from "../../Atoms";
import { getTimePassed } from "../../../Utils/commonUtils";

const icon = {
  width: 16,
  height: 16,
  color: COLORS.SECONDARY.GREY,
};

const UserPost: React.FC<UserPostProps> = ({
  postData: {
    caption,
    userName,
    noOfComments,
    noOfLikes,
    photo,
    timeSincePostedInMillis,
    userPhoto,
    isLiked,
  },
  handleCommentsPress,
  handleLikesPress,
}) => {
  return (
    <View style={styles.parent}>
      <View style={styles.userInfoCtr}>
        <CustomImage
          source={{ uri: userPhoto }}
          imageStyle={styles.userPhoto}
        />
        <View style={styles.userTextCtr}>
          <Text style={styles.userNameText}>{userName}</Text>
          <DescriptionText
            text={getTimePassed(timeSincePostedInMillis)}
            textStyle={{ fontSize: SIZES.font10, textAlign: "left" }}
          />
        </View>
      </View>
      {caption ? (
        <Text style={styles.captionText}>{caption}</Text>
      ) : (
        <View style={{ marginVertical: 8 }} />
      )}
      <CustomImage
        source={{ uri: photo }}
        parentStyle={styles.photo}
        imageStyle={{ borderRadius: SIZES.rounding2 }}
        activityIndicatorSize={"large"}
      />
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

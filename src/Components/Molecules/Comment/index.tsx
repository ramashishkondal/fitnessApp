// libs
import React from "react";
import { View, Text } from "react-native";

// custom
import { CommentProps } from "./types";
import { styles } from "./styles";
import { CustomImage, DescriptionText } from "../../Atoms";
import { getTimePassed } from "../../../Utils/commonUtils";
import { SIZES } from "../../../Constants";

const Comment: React.FC<CommentProps> = ({
  comment: { userPhoto, userName, commentCreatedOnInMillis, comment },
}) => {
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 16,
      }}
    >
      <View style={styles.userInfoCtr}>
        <View style={{ alignItems: "center" }}>
          <CustomImage
            source={{ uri: userPhoto }}
            imageStyle={styles.userPhoto}
          />
        </View>
        <View style={styles.userTextCtr}>
          <Text style={styles.userNameText}>{userName}</Text>
          <DescriptionText
            text={getTimePassed(commentCreatedOnInMillis)}
            textStyle={{ fontSize: SIZES.font11, textAlign: "left" }}
          />
          <View>
            <Text style={styles.commentText}>{comment}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Comment;

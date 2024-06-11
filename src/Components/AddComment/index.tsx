// libs
import React, { Dispatch, SetStateAction, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

// custom
import { useAppSelector } from "../../Redux/Store";
import CustomButton from "../CustomButton";
import { COLORS, ICONS, SIZES, STRING } from "../../Constants";
import { styles } from "./styles";

const AddPost = ({
  setModalVisible,
}: {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id: userId, photo: userPhoto, firstName, lastName } = useAppSelector(
    (state) => state.User.data
  );
  const handlePost = async () => {
    try {
      if (userId !== null && userPhoto !== null) {
        setIsLoading(true);

        setModalVisible(false);
      }
    } catch (e) {
      console.log("error", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.parent}>
      <View>
        <Text style={styles.titleText}>{STRING.ADD_Comment.TITLE}</Text>
        <TextInput
          autoFocus
          maxLength={100}
          onChangeText={setComment}
          style={styles.textInput}
        />
      </View>
      <View style={styles.footerCtr}>
        <View style={styles.childFooterCtr}>
          <TouchableOpacity style={styles.iconsCtr}>
            {ICONS.SmileyGood({
              width: 24,
              height: 24,
              color: COLORS.SECONDARY.GREY,
            })}
          </TouchableOpacity>
        </View>
        <CustomButton
          title="Post"
          parentStyle={styles.buttonParentStyle}
          textStyle={{ fontSize: SIZES.font13 }}
          onPress={handlePost}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

export default AddPost;

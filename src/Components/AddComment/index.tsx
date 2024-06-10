import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { SIZES, COLORS, ICONS } from "../../Constants";
import CustomButton from "../CustomButton";
import { styles } from "../CustomButton/styles";

const AddComment = () => {
    
  return (
    <View
      style={{
        maxWidth: "100%",
        justifyContent: "space-between",
        flex: 1,
      }}
    >
      <View>
        <Text style={styles.titleText}>Create a Post</Text>
        {photo ? (
          <Image
            source={{ uri: photo }}
            style={{
              height: 200,
              width: "100%",
              borderRadius: SIZES.rounding2,
            }}
          />
        ) : null}
        {photo ? (
          <>
            <Text style={{ marginTop: 8, fontSize: SIZES.font13 }}>
              Add a Caption
            </Text>
            <TextInput
              autoFocus
              maxLength={100}
              onChangeText={setCaption}
              style={{ marginHorizontal: 10 }}
            />
          </>
        ) : null}
      </View>
      <View
        style={{
          flexDirection: "row",
          borderTopWidth: 1,
          marginHorizontal: 8,
          borderColor: COLORS.SECONDARY.GREY,
          padding: 10,
          paddingVertical: 20,
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 60,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ marginHorizontal: 8 }}>
            {ICONS.SmileyGood({
              width: 24,
              height: 24,
              color: COLORS.SECONDARY.GREY,
            })}
          </TouchableOpacity>
        </View>
        <CustomButton
          title="Post"
          parentStyle={{ maxWidth: 100, maxHeight: 40 }}
          textStyle={{ fontSize: SIZES.font13 }}
          onPress={handlePost}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

export default AddComment;

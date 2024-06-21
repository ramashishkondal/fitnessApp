// libs
import React, { useEffect, useRef, useState } from "react";
import { Text, View, ScrollView, TextInput, Pressable } from "react-native";
import firestore, { Timestamp } from "@react-native-firebase/firestore";

// custom
import { styles } from "./styles";
import { Post, PostScreenProps } from "../../../Defs";
import {
  addLikes,
  firebaseDB,
  storePostComment,
} from "../../../Utils/userUtils";
import { Comment, UserPost } from "../../../Components";
import { useAppSelector } from "../../../Redux/Store";
import { COLORS, ICONS, SIZES } from "../../../Constants";

const PostScreen: React.FC<PostScreenProps> = ({ route }) => {
  // sate use
  const [postData, setPostData] = useState<Post>();
  const [comment, setComment] = useState("");

  // ref ues
  const textInputRef = useRef<TextInput | null>(null);

  // redux use
  const { id, photo: userPhoto, firstName, lastName } = useAppSelector(
    (state) => state.User.data
  );

  // effect use
  useEffect(() => {
    const unsubscribe = firestore()
      .collection(firebaseDB.collections.posts)
      .doc(route.params.postId)
      .onSnapshot((snapshot) => {
        const data = snapshot.data();
        console.log(data);
        if (data) {
          setPostData(data as Post);
        }
      });

    return () => unsubscribe();
  }, []);

  // functions
  const postComment = async () => {
    try {
      if (id !== null && comment !== "") {
        await storePostComment(route.params.postId, {
          userName: firstName + " " + lastName,
          userPhoto,
          comment,
          createdOn: Timestamp.fromDate(new Date()),
        });
        setComment("");
      }
    } catch (e) {
      console.log("error", e);
    } finally {
    }
  };

  if (postData) {
    console.log(postData);
    return (
      <>
        <ScrollView style={styles.parent}>
          <View style={{ flex: 3 }}>
            <UserPost
              postData={{
                caption: postData.caption,
                photo: postData.photo,
                noOfLikes: postData.likedByUsersId.length,
                noOfComments: postData.comments.length,
                isLiked: postData.likedByUsersId.includes(id!),
                userName: postData.userName,
                userPhoto: postData.userPhoto,
                id: id!,
                timeSincePostedInMillis: Timestamp.fromMillis(
                  postData.createdOn.seconds * 1000
                )
                  .toDate()
                  .getTime(),
              }}
              handleLikesPress={() => {
                const isLiked = postData.likedByUsersId.includes(id!);
                if (isLiked) {
                  addLikes(
                    route.params.postId,
                    postData.likedByUsersId.filter((value) => value !== id)
                  );
                } else {
                  addLikes(
                    postData.postId!,
                    postData.likedByUsersId.concat(id!)
                  );
                }
              }}
              handleCommentsPress={() => {
                textInputRef.current?.focus();
              }}
            />
          </View>
          <View
            style={{
              flex: 2,
              paddingBottom: SIZES.height / 10,
              paddingHorizontal: 24,
            }}
          >
            <Text
              style={{ fontSize: SIZES.font17, fontWeight: SIZES.fontBold0 }}
            >
              Comments
            </Text>
            {postData.comments.map((val) => {
              return (
                <Comment
                  comment={{
                    comment: val.comment,
                    commentCreatedOnInMillis: Timestamp.fromMillis(
                      val.createdOn.seconds * 1000
                    )
                      .toDate()
                      .getTime(),
                    userName: val.userName,
                    userPhoto: val.userPhoto,
                  }}
                />
              );
            })}
          </View>
        </ScrollView>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            borderWidth: 1,
            flex: 1,
            height: SIZES.height / 14,
            width: SIZES.width,
            backgroundColor: COLORS.SECONDARY.WHITE,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            value={comment}
            style={{ flex: 6, paddingHorizontal: 24, fontSize: SIZES.font12 }}
            placeholder="Write a comment..."
            ref={textInputRef}
            onChangeText={setComment}
            onSubmitEditing={postComment}
          />
          <Pressable style={{ flex: 1 }} onPress={postComment}>
            <View>{ICONS.ArrowUp({ width: 30, height: 30 })}</View>
          </Pressable>
        </View>
      </>
    );
  }
};

export default PostScreen;

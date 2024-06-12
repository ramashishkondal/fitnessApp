// libs
import React, { useEffect, useRef, useState } from "react";
import { Text, View, ScrollView, TextInput } from "react-native";
import firestore, { Timestamp } from "@react-native-firebase/firestore";

// custom
import { styles } from "./styles";
import { Post, PostScreenProps } from "../../../Defs";
import { addLikes, firebaseDB } from "../../../Utils/userUtils";
import { Comment, UserPost } from "../../../Components";
import { useAppSelector } from "../../../Redux/Store";
import { COLORS, SIZES } from "../../../Constants";

const PostScreen: React.FC<PostScreenProps> = ({ route }) => {
  // sate use
  const [postData, setPostData] = useState<Post>();

  // ref ues
  const textInputRef = useRef<TextInput | null>(null);

  // redux use
  const { id } = useAppSelector((state) => state.User.data);

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
                postedOn: Timestamp.fromMillis(
                  postData.createdOn.seconds * 1000
                )
                  .toDate()
                  .toDateString(),
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
            <Text>Comments</Text>
            {postData.comments.map((val) => {
              return (
                <Comment
                  comment={{
                    comment: val.comment,
                    createdOn: Timestamp.fromMillis(
                      postData.createdOn.seconds * 1000
                    )
                      .toDate()
                      .toDateString(),
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
          }}
        >
          <TextInput
            style={{ flex: 1, paddingHorizontal: 24, fontSize: SIZES.font12 }}
            placeholder="Write a comment..."
            ref={textInputRef}
          />
        </View>
      </>
    );
  }
};

export default PostScreen;

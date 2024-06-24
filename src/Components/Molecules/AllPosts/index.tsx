import React, {useEffect, useState} from 'react';
import {View, Pressable} from 'react-native';
import {addLikes, firebaseDB, sendNotification} from '../../../Utils/userUtils';
import UserPost from '../UserPost';
import {Post} from '../../../Defs';
import firestore, {Timestamp} from '@react-native-firebase/firestore';
import {useAppSelector} from '../../../Redux/Store';
import {AllPostsProps} from './type';

const AllPosts: React.FC<AllPostsProps> = ({
  goToPostScreen,
  postIdRef,
  handleCommentPress,
}) => {
  // state use
  const [postsData, setPostsData] = useState<Post[]>();

  // redux use
  const {
    id: userId,
    firstName,
    lastName,
    photo,
  } = useAppSelector(state => state.User.data);

  // effect use
  useEffect(() => {
    const unsubscribe = firestore()
      .collection(firebaseDB.collections.posts)
      .orderBy('createdOn', 'desc')
      .onSnapshot(snapshot => {
        const data = snapshot.docs;
        const x = data.map(val => val.data()) as Post[];
        console.log(x);
        setPostsData(x);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View>
      {postsData
        ? postsData?.map(val => {
            const isLiked = val.likedByUsersId.includes(userId!);
            return (
              <Pressable onPress={goToPostScreen(val.postId!)} key={val.postId}>
                <UserPost
                  postData={{
                    caption: val.caption,
                    noOfComments: val.comments?.length,
                    noOfLikes: val.likedByUsersId?.length ?? 0,
                    photo: val.photo,
                    timeSincePostedInMillis: Timestamp.fromMillis(
                      val.createdOn.seconds * 1000,
                    )
                      .toDate()
                      .getTime(),
                    userName: val.userName,
                    userPhoto: val.userPhoto,
                    isLiked,
                    id: val.postId!,
                  }}
                  handleCommentsPress={() => {
                    postIdRef.current = val;
                    handleCommentPress(true);
                  }}
                  handleLikesPress={() => {
                    if (isLiked) {
                      addLikes(
                        val.postId!,
                        val.likedByUsersId.filter(value => value !== userId),
                      );
                      if (val.userId !== userId) {
                        sendNotification(
                          {
                            createdOn: Timestamp.fromDate(new Date()),
                            message: 'liked your post.',
                            userName: firstName + ' ' + lastName ?? '',
                            userPhoto: photo,
                            isUnread: true,
                            isShownViaPushNotification: false,
                          },
                          val.userId,
                        );
                      }
                    } else {
                      addLikes(val.postId!, val.likedByUsersId.concat(userId!));
                    }
                  }}
                />
              </Pressable>
            );
          })
        : null}
    </View>
  );
};

export default AllPosts;

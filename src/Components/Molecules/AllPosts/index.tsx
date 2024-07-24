import React, {useEffect, useState} from 'react';
import {FlatList, ListRenderItem, Pressable, View} from 'react-native';
import {addLikes, firebaseDB} from '../../../Utils/userUtils';
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
        setPostsData(x);
      });

    return () => unsubscribe();
  }, []);

  // functions

  const getHandleCommentPress = (post: Post) => {
    return () => {
      postIdRef.current = post;
      handleCommentPress(true);
    };
  };

  const renderItem: ListRenderItem<Post> = ({item: val}) => {
    const isLiked = val.likedByUsersId.includes(userId!);
    return (
      <Pressable onPress={goToPostScreen(val.postId!)} key={val.postId}>
        <UserPost
          userId={val.userId}
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
            isLiked,
            id: val.postId!,
          }}
          handleCommentsPress={getHandleCommentPress(val)}
          handleLikesPress={() => {
            if (isLiked) {
              addLikes(
                userId!,
                val.postId!,
                val.likedByUsersId.filter(value => value !== userId),
              );
            } else {
              addLikes(
                userId!,
                val.postId!,
                val.likedByUsersId.concat(userId!),
                {
                  sendNotificationToUserId: val.userId,
                  userName: firstName + ' ' + lastName,
                  userPhoto: photo,
                },
              );
            }
          }}
        />
      </Pressable>
    );
  };

  return (
    <View>
      {postsData ? (
        <FlatList
          scrollEnabled={false}
          data={postsData}
          renderItem={renderItem}
          onEndReachedThreshold={1}
        />
      ) : null}
    </View>
  );
};

export default AllPosts;

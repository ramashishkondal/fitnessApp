import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
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
  const [dataLength, setDataLength] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(false);

  // redux use
  const {
    id: userId,
    firstName,
    lastName,
    photo,
  } = useAppSelector(state => state.User.data);

  // effect use
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = firestore()
      .collection(firebaseDB.collections.posts)
      .orderBy('createdOn', 'desc')
      .limit(dataLength)
      .onSnapshot(snapshot => {
        const data = snapshot.docs;
        const x = data.map(val => val.data()) as Post[];
        setPostsData(x);
      });
    setIsLoading(false);
    return () => unsubscribe();
  }, [dataLength]);

  return (
    <View>
      {postsData ? (
        <FlatList
          scrollEnabled={false}
          data={postsData}
          renderItem={({item: val}) => {
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
                  handleCommentsPress={() => {
                    postIdRef.current = val;
                    handleCommentPress(true);
                  }}
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
                          userName: firstName + ' ' + lastName ?? '',
                          userPhoto: photo,
                        },
                      );
                    }
                  }}
                />
              </Pressable>
            );
          }}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            console.log('end reached');
            if (!isLoading) {
              console.log(dataLength);
              setDataLength(dataLength + 5);
            }
          }}
          ListFooterComponent={() => {
            if (isLoading) {
              return <Text>Loading more...</Text>;
            }
          }}
        />
      ) : null}
    </View>
  );
};

export default AllPosts;

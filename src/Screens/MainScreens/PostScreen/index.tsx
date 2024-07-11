// libs
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableOpacity,
} from 'react-native';
import firestore, {Timestamp} from '@react-native-firebase/firestore';

// custom
import {styles} from './styles';
import {Post, PostScreenProps} from '../../../Defs';
import {addLikes, firebaseDB, storePostComment} from '../../../Utils/userUtils';
import {
  Comment,
  CustomImage,
  CustomLoading,
  UserPost,
} from '../../../Components';
import {useAppSelector} from '../../../Redux/Store';
import {COLORS, ICONS, SIZES} from '../../../Constants';

const PostScreen: React.FC<PostScreenProps> = ({route}) => {
  // sate use
  const [postData, setPostData] = useState<Post>();
  const [comment, setComment] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPhoto, setShowPhoto] = useState(false);

  // ref ues
  const textInputRef = useRef<TextInput | null>(null);

  // redux use
  const {
    id,
    photo: userPhoto,
    firstName,
    lastName,
  } = useAppSelector(state => state.User.data);

  // effect use
  useEffect(() => {
    const unsubscribe = firestore()
      .collection(firebaseDB.collections.posts)
      .doc(route.params.postId)
      .onSnapshot(snapshot => {
        const data = snapshot.data();
        if (data) {
          setPostData(data as Post);
        }
      });

    return () => unsubscribe();
  }, [route.params.postId]);

  // functions
  const postComment = async () => {
    setIsLoading(true);
    try {
      if (id !== null && comment !== '' && postData) {
        setComment('');
        await storePostComment(
          route.params.postId,
          {
            userId: id,
            comment,
            createdOn: Timestamp.fromDate(new Date()),
          },
          {
            sendNotificationToUserId: postData.userId,
          },
        );
      }
    } catch (e) {
      console.log('error', e);
    }
    Keyboard.dismiss();
    setIsLoading(false);
  };

  if (postData) {
    return (
      <>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'height' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 95 : 0}>
          <ScrollView style={styles.parent}>
            <View style={styles.userPostCtr}>
              <UserPost
                userId={postData.userId}
                postData={{
                  caption: postData.caption,
                  photo: postData.photo,
                  noOfLikes: postData.likedByUsersId.length,
                  noOfComments: postData.comments.length,
                  isLiked: postData.likedByUsersId.includes(id!),
                  id: id!,
                  timeSincePostedInMillis: Timestamp.fromMillis(
                    postData.createdOn.seconds * 1000,
                  )
                    .toDate()
                    .getTime(),
                }}
                handleLikesPress={() => {
                  const isLiked = postData.likedByUsersId.includes(id!);
                  if (isLiked) {
                    addLikes(
                      id!,
                      route.params.postId,
                      postData.likedByUsersId.filter(value => value !== id),
                    );
                  } else {
                    addLikes(
                      id!,
                      postData.postId!,
                      postData.likedByUsersId.concat(id!),
                      {
                        sendNotificationToUserId: postData.userId,
                        userName: firstName + ' ' + lastName,
                        userPhoto,
                      },
                    );
                  }
                }}
                handleCommentsPress={() => {
                  textInputRef.current?.focus();
                }}
                handlePhotoPress={() => {
                  setShowPhoto(true);
                  console.log('phto pressed');
                }}
              />
            </View>
            <View style={styles.commentsCtr}>
              <Text style={styles.commentText}>Comments</Text>
              {postData.comments
                .slice(0)
                .reverse()
                .map((val, index) => {
                  return (
                    <Comment
                      key={index}
                      comment={{
                        comment: val.comment,
                        commentCreatedOnInMillis: Timestamp.fromMillis(
                          val.createdOn.seconds * 1000,
                        )
                          .toDate()
                          .getTime(),
                        userId: val.userId,
                      }}
                    />
                  );
                })}
            </View>
          </ScrollView>
          <View style={styles.bottomTextInputCtr}>
            <TextInput
              value={comment}
              style={styles.textInput}
              placeholder="Write a comment..."
              ref={textInputRef}
              onChangeText={setComment}
              onSubmitEditing={postComment}
              placeholderTextColor={'black'}
            />
            <Pressable
              style={styles.sendCtr}
              onPress={postComment}
              disabled={isLoading}>
              {isLoading ? (
                <CustomLoading color={COLORS.PRIMARY.PURPLE} />
              ) : (
                <View>{ICONS.ArrowUp({width: 30, height: 30})}</View>
              )}
            </Pressable>
          </View>
        </KeyboardAvoidingView>
        {showPhoto ? (
          <TouchableOpacity
            onPress={() => setShowPhoto(false)}
            style={{
              position: 'absolute',
              backgroundColor: '#11111199',
              width: '100%',
              height: SIZES.height,
            }}>
            {postData ? (
              <CustomImage
                source={{uri: postData?.photo}}
                imageStyle={{width: '100%', height: '80%'}}
                resizeMode="contain"
              />
            ) : null}
          </TouchableOpacity>
        ) : null}
      </>
    );
  }
};

export default PostScreen;

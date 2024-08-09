// libs
import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Pressable, Alert} from 'react-native';

// 3rd party
import firestore from '@react-native-firebase/firestore';

// custom
import {styles} from './styles';
import {UserPostProps} from './types';
import {COLORS, ICONS, IMAGES, SIZES} from '../../../Constants';
import {CustomImage, DescriptionText} from '../../Atoms';
import {getTimePassed} from '../../../Utils/commonUtils';
import {appStackParamList, User} from '../../../Defs';
import {deletePost, firebaseDB} from '../../../Utils/userUtils';
import {useAppSelector} from '../../../Redux/Store';
import ToastError from '../../Atoms/ToastError';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const icon = {
  width: 16,
  height: 16,
  color: COLORS.SECONDARY.GREY,
};

const UserPost: React.FC<UserPostProps> = ({
  postData: {
    caption,
    noOfComments,
    noOfLikes,
    timeSincePostedInMillis,
    isLiked,
    photo,
    id: postId,
  },
  userId,
  handleCommentsPress,
  handleLikesPress,
  handlePhotoPress,
  showDelete = false,
}) => {
  // state use
  const [userData, setUserData] = useState<User>();

  // navigation use
  const navigator =
    useNavigation<NativeStackNavigationProp<appStackParamList>>();

  // redux use
  const {id} = useAppSelector(state => state.User.data);

  // effect use
  useEffect(() => {
    const unsubscribe = firestore()
      .collection(firebaseDB.collections.users)
      .doc(userId)
      .onSnapshot(snapshot => {
        const data = snapshot.data() as User;
        if (data) {
          setUserData(data);
        }
      });
    return () => unsubscribe();
  }, [userId]);

  // functions
  const handleDeletePost = () => {
    Alert.alert('Warning', 'Are you sure you want to delete the post?', [
      {
        text: 'yes',
        onPress: () => {
          navigator.goBack();
          deletePost(postId).catch(() =>
            ToastError('Error', 'Something went wrong!'),
          );
        },
      },
      {text: 'cancel'},
    ]);
  };

  return (
    <View style={styles.parent}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={styles.userInfoCtr}
          disabled={!userData}
          onPress={() => {
            if (userData) {
              navigator.navigate('OtherUserScreen', {userData});
            }
          }}>
          {userData ? (
            <CustomImage
              source={
                userData.photo ? {uri: userData?.photo} : IMAGES.DEFAULT_USER
              }
              imageStyle={styles.userPhoto}
            />
          ) : null}
          <View style={styles.userTextCtr}>
            {userData ? (
              <Text style={styles.userNameText} numberOfLines={1}>
                {userData.firstName + ' ' + userData.lastName}
              </Text>
            ) : null}
            <DescriptionText
              text={getTimePassed(timeSincePostedInMillis)}
              textStyle={styles.descriptionText}
            />
          </View>
        </TouchableOpacity>

        {showDelete && userId === id ? (
          <Pressable
            onPress={handleDeletePost}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            {ICONS.GarbageCan({
              width: 25,
              height: 25,
              color: COLORS.SECONDARY.GREY,
            })}
          </Pressable>
        ) : null}
      </View>
      {caption ? (
        <Text style={styles.captionText}>{caption}</Text>
      ) : (
        <View style={styles.noCaptionCtr} />
      )}
      {handlePhotoPress ? (
        <TouchableOpacity onPress={handlePhotoPress}>
          <CustomImage
            source={{uri: photo}}
            parentStyle={styles.photo}
            imageStyle={{borderRadius: SIZES.rounding2}}
            activityIndicatorSize={'large'}
          />
        </TouchableOpacity>
      ) : (
        <CustomImage
          source={{uri: photo}}
          parentStyle={styles.photo}
          imageStyle={{borderRadius: SIZES.rounding2}}
          activityIndicatorSize={'large'}
        />
      )}
      <View style={styles.likesAndCommentsCtr}>
        <TouchableOpacity onPress={handleLikesPress} style={styles.likeCtr}>
          {ICONS.HeartLike({
            ...icon,
            color: isLiked ? COLORS.PRIMARY.PURPLE : COLORS.SECONDARY.GREY,
          })}
          <Text style={styles.likesText}>{noOfLikes}</Text>
        </TouchableOpacity>
        <View style={styles.commentCtr}>
          <TouchableOpacity
            onPress={handleCommentsPress}
            style={styles.commentLogoCtr}>
            {ICONS.Comment(icon)}
            <Text style={styles.likesText}>{noOfComments}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default React.memo(UserPost);

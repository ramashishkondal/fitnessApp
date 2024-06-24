// libs
import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

// 3rd party
import firestore from '@react-native-firebase/firestore';

// custom
import {styles} from './styles';
import {UserPostProps} from './types';
import {COLORS, ICONS, SIZES} from '../../../Constants';
import {CustomImage, DescriptionText} from '../../Atoms';
import {getTimePassed} from '../../../Utils/commonUtils';
import {User} from '../../../Defs';
import {firebaseDB} from '../../../Utils/userUtils';

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
  },
  userId,
  handleCommentsPress,
  handleLikesPress,
}) => {
  // state use
  const [userData, setUserData] = useState<User>();

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

  return (
    <View style={styles.parent}>
      <View style={styles.userInfoCtr}>
        {userData ? (
          <CustomImage
            source={{uri: userData?.photo}}
            imageStyle={styles.userPhoto}
          />
        ) : null}
        <View style={styles.userTextCtr}>
          {userData ? (
            <Text style={styles.userNameText}>
              {userData.firstName + ' ' + userData.lastName}
            </Text>
          ) : null}
          <DescriptionText
            text={getTimePassed(timeSincePostedInMillis)}
            textStyle={{fontSize: SIZES.font10, textAlign: 'left'}}
          />
        </View>
      </View>
      {caption ? (
        <Text style={styles.captionText}>{caption}</Text>
      ) : (
        <View style={{marginVertical: 8}} />
      )}
      <CustomImage
        source={{uri: photo}}
        parentStyle={styles.photo}
        imageStyle={{borderRadius: SIZES.rounding2}}
        activityIndicatorSize={'large'}
      />
      <View style={styles.likesAndCommentsCtr}>
        <TouchableOpacity onPress={handleLikesPress} style={styles.likeCtr}>
          {ICONS.HeartLike({
            ...icon,
            color: isLiked ? COLORS.PRIMARY.PURPLE : COLORS.SECONDARY.GREY,
          })}
          <Text style={styles.likesText}>{noOfLikes}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCommentsPress}
          style={styles.commentCtr}>
          {ICONS.Comment(icon)}
          <Text style={styles.likesText}>{noOfComments}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserPost;

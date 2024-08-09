// libs
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

// 3rd party
import firestore from '@react-native-firebase/firestore';

// custom
import {CommentProps} from './types';
import {styles} from './styles';
import {CustomImage, DescriptionText} from '../../Atoms';
import {getTimePassed} from '../../../Utils/commonUtils';
import {firebaseDB} from '../../../Utils/userUtils';
import {User} from '../../../Defs';
import {IMAGES} from '../../../Constants';

const Comment: React.FC<CommentProps> = ({
  comment: {userId, commentCreatedOnInMillis, comment},
  parentStyle,
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
    <View style={[styles.parent, parentStyle]}>
      <View style={styles.userInfoCtr}>
        <View style={styles.customImageCtr}>
          {userData ? (
            <CustomImage
              source={
                userData.photo ? {uri: userData.photo} : IMAGES.DEFAULT_USER
              }
              imageStyle={styles.userPhoto}
            />
          ) : null}
        </View>
        <View style={styles.userTextCtr}>
          {userData ? (
            <Text style={styles.userNameText} numberOfLines={1}>
              {userData.firstName + ' ' + userData.lastName}
            </Text>
          ) : null}
          <DescriptionText
            text={getTimePassed(commentCreatedOnInMillis)}
            textStyle={styles.descriptionText}
          />
          <View>
            <Text style={styles.commentText}>{comment}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Comment;

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
import {SIZES} from '../../../Constants';
import {firebaseDB} from '../../../Utils/userUtils';
import {User} from '../../../Defs';

const Comment: React.FC<CommentProps> = ({
  comment: {userId, commentCreatedOnInMillis, comment},
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
    <View
      style={{
        flex: 1,
        paddingVertical: 16,
      }}>
      <View style={styles.userInfoCtr}>
        <View style={{alignItems: 'center'}}>
          {userData ? (
            <CustomImage
              source={{uri: userData.photo}}
              imageStyle={styles.userPhoto}
            />
          ) : null}
        </View>
        <View style={styles.userTextCtr}>
          {userData ? (
            <Text style={styles.userNameText}>
              {userData.firstName + ' ' + userData.lastName ?? ''}
            </Text>
          ) : null}
          <DescriptionText
            text={getTimePassed(commentCreatedOnInMillis)}
            textStyle={{fontSize: SIZES.font11, textAlign: 'left'}}
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

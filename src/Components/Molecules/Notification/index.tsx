// libs
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

// 3rd party
import firestore from '@react-native-firebase/firestore';

// custom
import {NotificationProps} from './types';
import {CustomImage, DescriptionText} from '../../Atoms';
import {styles} from './styles';
import {firebaseDB} from '../../../Utils/userUtils';
import {User} from '../../../Defs';

const Notification: React.FC<NotificationProps> = ({
  userId,
  notificationText,
  timeAgo,
  isUnread,
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
      <View style={styles.CustomImageCtr}>
        {userData ? (
          <CustomImage
            source={{uri: userData.photo}}
            parentStyle={styles.customImageParentStyle}
            imageStyle={styles.customImageStyle}
          />
        ) : null}
      </View>
      <View style={styles.textCtr}>
        <Text style={styles.notificationText}>
          {userData && userData.firstName ? (
            <Text style={styles.userNameText}>
              {userData.firstName + ' ' + userData.lastName + ' '}
            </Text>
          ) : null}
          {notificationText}
        </Text>
        <DescriptionText text={timeAgo} textStyle={styles.descriptionText} />
      </View>
      <View style={styles.isUnreadCtr}>
        {isUnread ? <View style={styles.isUnreadDot} /> : null}
      </View>
    </View>
  );
};

export default Notification;

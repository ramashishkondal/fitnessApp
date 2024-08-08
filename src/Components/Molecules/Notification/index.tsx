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
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {IMAGES} from '../../../Constants';
import {Swipeable} from 'react-native-gesture-handler';

const Notification: React.FC<NotificationProps> = ({
  userId,
  notificationText,
  timeAgo,
  isUnread,
  handleDeletePressed,
  handleUnreadSingleNotification,
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
          console.log(data);
          setUserData(data);
        }
      });
    return () => unsubscribe();
  }, [userId]);

  // functions
  const rightSwipeActions = () => {
    return (
      <TouchableOpacity
        style={styles.deleteCtr}
        onPress={() => handleDeletePressed()}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={rightSwipeActions}>
      <TouchableOpacity
        style={styles.parent}
        onPress={handleUnreadSingleNotification}>
        <View style={styles.CustomImageCtr}>
          {userData ? (
            <CustomImage
              source={
                userData.photo ? {uri: userData.photo} : IMAGES.DEFAULT_USER
              }
              parentStyle={styles.customImageParentStyle}
              imageStyle={styles.customImageStyle}
            />
          ) : null}
        </View>
        <View style={styles.textCtr}>
          <Text style={styles.notificationText}>
            {userData?.firstName ? (
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
      </TouchableOpacity>
    </Swipeable>
  );
};

export default Notification;

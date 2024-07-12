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
import {Swipeable} from 'react-native-gesture-handler';
import {TouchableOpacity} from '@gorhom/bottom-sheet';

const Notification: React.FC<NotificationProps> = ({
  userId,
  notificationText,
  timeAgo,
  isUnread,
  handleDeletePressed,
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
    </Swipeable>
  );
};

export default Notification;

// libs
import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';

// 3rd party
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

// custom
import {styles} from './styles';
import {DescriptionText, HeadingText, Notification} from '../../../Components';
import {
  NotificationDataFirebaseDB,
  firebaseDB,
  updateNotificationReadStatus,
} from '../../../Utils/userUtils';
import {useAppSelector} from '../../../Redux/Store';
import {getTimePassed} from '../../../Utils/commonUtils';

const Notifications: React.FC = () => {
  // state ues
  const [notificationsData, setNotificationsData] =
    useState<Array<NotificationDataFirebaseDB>>();

  // redux use
  const {id: userId} = useAppSelector(state => state.User.data);

  // effect use
  useEffect(() => {
    const unsubscribe = firestore()
      .collection(firebaseDB.collections.users)
      .doc(userId!)
      .onSnapshot(snapshot => {
        setNotificationsData(
          snapshot.get('notifications') as Array<NotificationDataFirebaseDB>,
        );
      });
    return () => unsubscribe();
  }, [userId]);

  // navigation hook use
  // useFocusEffect(() => {
  //   if (notificationsData) {
  //     return () => {
  //       updateNotificationReadStatus(
  //         userId!,
  //         notificationsData?.map(val => ({...val, isUnread: false})),
  //       );
  //     };
  //   }
  // });

  return (
    <View style={styles.parent}>
      <HeadingText text="Notifications" textStyle={styles.headingText} />
      <DescriptionText
        text={`${
          notificationsData?.filter(val => val.isUnread === true).length
        } unread Notifications`}
        textStyle={styles.descriptionText}
      />
      <View style={styles.notificationsCtr}>
        <FlatList
          data={notificationsData?.slice().reverse()}
          style={styles.flatList}
          renderItem={({item}) => (
            <Notification
              isUnread={item.isUnread}
              notificationText={item.message}
              timeAgo={getTimePassed(item.createdOn.seconds * 1000)}
              userId={item.userId}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Notifications;

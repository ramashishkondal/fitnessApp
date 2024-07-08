// libs
import React, {useEffect, useState} from 'react';
import {View, Pressable, Text, FlatList, TouchableOpacity} from 'react-native';

// 3rd party
import firestore from '@react-native-firebase/firestore';

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
  const [notificationsData, setNotificationsData] = useState<
    Array<NotificationDataFirebaseDB>
  >([]);
  const [showMenu, setShowMenu] = useState(false);

  // redux use
  const {id: userId} = useAppSelector(state => state.User.data);

  // effect use
  useEffect(() => {
    const unsubscribe = firestore()
      .collection(firebaseDB.collections.users)
      .doc(userId!)
      .onSnapshot(snapshot => {
        const data: Array<NotificationDataFirebaseDB> =
          snapshot.get('notifications');
        setNotificationsData(data);
      });
    return () => unsubscribe();
  }, [userId]);

  const markAllRead = () => {
    if (notificationsData) {
      updateNotificationReadStatus(
        userId!,
        notificationsData?.map(val => ({...val, isUnread: false})),
      );
    }
    setShowMenu(false);
  };

  const markAllUnread = () => {
    if (notificationsData) {
      updateNotificationReadStatus(
        userId!,
        notificationsData?.map(val => ({...val, isUnread: true})),
      );
    }
    setShowMenu(false);
  };

  const clearAllNotifications = () => {
    updateNotificationReadStatus(userId!, []);
  };

  return (
    <TouchableOpacity
      style={{flex: 1}}
      activeOpacity={1}
      disabled={!showMenu}
      onPress={() => setShowMenu(false)}>
      <View style={styles.parent}>
        <View style={styles.menuCtr}>
          {showMenu ? (
            <View style={styles.activeMenuCtr}>
              <Pressable onPress={markAllRead}>
                <Text style={styles.menuText}>Mark all as read</Text>
              </Pressable>
              <Pressable onPress={markAllUnread}>
                <Text style={styles.menuText}>Mark all as unread</Text>
              </Pressable>
              <Pressable onPress={clearAllNotifications}>
                <Text style={styles.menuText}>Clear all</Text>
              </Pressable>
            </View>
          ) : null}
          <View>
            <HeadingText text="Notifications" textStyle={styles.headingText} />
            <DescriptionText
              text={`${
                notificationsData?.filter(val => val.isUnread === true).length
              } unread Notifications`}
              textStyle={styles.descriptionText}
            />
          </View>
          <Pressable onPress={() => setShowMenu(!showMenu)}>
            <View style={styles.dots} />
            <View style={styles.dots} />
            <View style={styles.dots} />
          </Pressable>
        </View>

        <View style={styles.notificationsCtr}>
          {notificationsData.length ? (
            <FlatList
              scrollEnabled
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
          ) : (
            <DescriptionText
              text="There are no notifications for now"
              textStyle={styles.descriptionTextNoNotification}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Notifications;

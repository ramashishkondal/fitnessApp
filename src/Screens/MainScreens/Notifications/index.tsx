// libs
import React, {useEffect, useState} from 'react';
import {
  View,
  Pressable,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

// 3rd party
import firestore, {Timestamp} from '@react-native-firebase/firestore';

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
  console.log(userId);
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

  const markNotificationAsRead = (createdOn: Timestamp) => {
    setShowMenu(false);
    if (notificationsData) {
      updateNotificationReadStatus(
        userId!,
        notificationsData.map(val => {
          if (createdOn.seconds * 1000 === val.createdOn.seconds * 1000) {
            return {...val, isUnread: false};
          }
          return val;
        }),
      );
    }
  };

  const clearAllNotifications = () => {
    Alert.alert(
      'Warning',
      'Are you sure you want to delete all notifications?',
      [
        {
          text: 'yes',
          onPress: () => {
            updateNotificationReadStatus(userId!, []);
            setShowMenu(false);
          },
        },
        {
          text: 'cancel',
        },
      ],
    );
  };

  const handleDeleteNotification = (createdOn: Timestamp) => {
    updateNotificationReadStatus(
      userId!,
      notificationsData.filter(
        val => createdOn.seconds * 1000 !== val.createdOn.seconds * 1000,
      ),
    );
  };

  return (
    <TouchableOpacity
      style={styles.touchable}
      activeOpacity={1}
      disabled={!showMenu}
      onPress={() => setShowMenu(false)}>
      <View style={styles.parent}>
        <View style={styles.menuCtr}>
          {showMenu ? (
            <View style={styles.activeMenuCtr}>
              <Pressable
                onPress={clearAllNotifications}
                style={styles.menuTextCtrLast}>
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
          {notificationsData?.length ? (
            <Pressable
              onPress={() => setShowMenu(!showMenu)}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <View style={styles.dots} />
              <View style={styles.dots} />
              <View style={styles.dots} />
            </Pressable>
          ) : null}
        </View>

        <View style={styles.notificationsCtr}>
          {notificationsData?.length ? (
            <FlatList
              scrollEnabled
              data={notificationsData?.slice().reverse()}
              style={styles.flatList}
              renderItem={({item}) => (
                <Notification
                  key={item.createdOn.seconds * 1000}
                  isUnread={item.isUnread}
                  notificationText={item.message}
                  timeAgo={getTimePassed(item.createdOn.seconds * 1000)}
                  userId={item.userId}
                  handleDeletePressed={() =>
                    handleDeleteNotification(item.createdOn)
                  }
                  handleUnreadSingleNotification={() =>
                    markNotificationAsRead(item.createdOn)
                  }
                />
              )}
            />
          ) : (
            <View style={styles.noNotificationTextCtr}>
              <DescriptionText
                text="There are no notifications for now"
                textStyle={styles.descriptionTextNoNotification}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Notifications;

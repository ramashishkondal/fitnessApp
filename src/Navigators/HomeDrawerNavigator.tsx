import React, {useCallback, useEffect} from 'react';

// 3rd party
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {Alert, Platform, Text, View} from 'react-native';
import {CustomDrawerButton, CustomDrawerRight} from '../Components';
import {
  Community,
  GetPremium,
  HomeScreen,
  Notifications,
  Settings,
} from '../Screens/MainScreens';
import {homeDrawerParamList} from '../Defs';
import {COLORS, ICONS, SIZES} from '../Constants';
import BackForDrawer from '../Components/Molecules/BackForDrawer';
import {styles} from './styles';
import {FONT_FAMILY} from '../Constants/commonStyles';
import {useAppDispatch, useAppSelector} from '../Redux/Store';
import {resetUserData} from '../Redux/Reducers/currentUser';
import {onDisplayNotification} from '../Utils/commonUtils';
import {
  NotificationDataFirebaseDB,
  getUserData,
  firebaseDB,
  updateNotificationReadStatus,
} from '../Utils/userUtils';

const iconSize = {
  width: 25,
  height: 25,
};
const drawerIcon = (
  icon: (size: {
    width: number;
    height: number;
    color?: string;
  }) => React.ReactNode,
) => {
  return () => {
    return <View style={styles.drawerIcon}>{icon(iconSize)}</View>;
  };
};
const drawerIconNotification = (
  icon: (size: {
    width: number;
    height: number;
    color?: string;
  }) => React.ReactNode,
  noOfNotification: number,
) => {
  [];

  return () => {
    return (
      <View style={styles.drawerIcon}>
        {icon(iconSize)}
        <View
          style={{
            position: 'absolute',
            bottom: -1,
            right: -2,
            width: '60%',
            height: '60%',
            backgroundColor: COLORS.PRIMARY.PURPLE,
            borderRadius: 200,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: COLORS.SECONDARY.WHITE,
              fontFamily: FONT_FAMILY.BOLD,
              fontSize: SIZES.font10,
            }}>
            {noOfNotification}
          </Text>
        </View>
      </View>
    );
  };
};

const Drawer = createDrawerNavigator<homeDrawerParamList>();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {id} = useAppSelector(state => state.User.data);
  const {allowPushNotifications} = useAppSelector(state => state.settings.data);

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      {
        text: 'YES',
        onPress: () => {
          dispatch(resetUserData());
          auth().signOut();
        },
      },
      {
        text: 'NO',
        onPress: () => {
          console.log('OK Pressed');
        },
      },
    ]);
  };
  useEffect(() => {
    let isMounted = true;

    const handleNotifications = async (val: NotificationDataFirebaseDB) => {
      if (val.isShownViaPushNotification === false && allowPushNotifications) {
        const uD = await getUserData(val.userId);
        if (isMounted) {
          setTimeout(
            onDisplayNotification,
            500,
            `${uD.firstName} ${uD.lastName} ${val.message}`,
          );
        }
        return {
          ...val,
          isShownViaPushNotification: true,
        };
      }
      return val;
    };

    const processNotifications = async (
      notifications: NotificationDataFirebaseDB[],
    ) => {
      const updatedNotifications = await Promise.all(
        notifications.map(handleNotifications),
      );
      if (isMounted) {
        updateNotificationReadStatus(id!, updatedNotifications);
      }
    };

    const unsubscribe = firestore()
      .collection(firebaseDB.collections.users)
      .doc(id!)
      .onSnapshot(async snapshot => {
        if (snapshot.exists) {
          const notifications = snapshot.get(
            'notifications',
          ) as NotificationDataFirebaseDB[];
          await processNotifications(notifications);
        }
      });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [allowPushNotifications, id]);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        top: '25%',
      }}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        icon={drawerIcon(ICONS.LogOut)}
        onPress={handleLogout}
        labelStyle={{
          color: 'black',
          fontSize: SIZES.font14,
          fontFamily: FONT_FAMILY.SEMI_BOLD,
        }}
        activeTintColor={COLORS.PRIMARY.PURPLE}
      />
    </DrawerContentScrollView>
  );
};

const HomeNavigator: React.FC = () => {
  // redux use
  const {notifications} = useAppSelector(state => state.User.data);
  const unreadNotifications = useCallback(
    () => notifications.filter(val => val.isUnread).length,
    [notifications],
  );

  const headerLeft = () => {
    return <CustomDrawerButton />;
  };
  const headerRight = () => {
    return <CustomDrawerRight />;
  };

  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerTitle: '',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
          height:
            Platform.OS === 'ios' ? SIZES.height / 7.5 : SIZES.height / 17,
          borderWidth: 1,
        },
        headerLeft,
        drawerStyle: {
          justifyContent: 'center',
        },
        drawerContentContainerStyle: {
          top: '25%',
        },
        drawerLabelStyle: {
          color: 'black',
          fontSize: SIZES.font14,
          fontFamily: FONT_FAMILY.SEMI_BOLD,
        },
        drawerActiveTintColor: COLORS.PRIMARY.PURPLE,
        drawerType: 'front',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Homescreen',
          drawerIcon: drawerIcon(ICONS.Home),
          headerRight,
          headerStyle: {
            backgroundColor: COLORS.PRIMARY.DARK_GREY,
            height:
              Platform.OS === 'ios' ? SIZES.height / 6.5 : SIZES.height / 10,
          },
        }}
      />
      <Drawer.Screen
        name="Community"
        component={Community}
        options={{
          drawerIcon: drawerIcon(ICONS.Community),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{
          drawerIcon: drawerIconNotification(
            ICONS.Notification,
            unreadNotifications(),
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: drawerIcon(ICONS.Settings),
        }}
      />
      <Drawer.Screen
        name="GetPremium"
        component={GetPremium}
        options={{
          title: 'Get Premium',
          drawerIcon: drawerIcon(ICONS.Premium),
          headerTransparent: true,
          headerShown: true,
          headerLeft: BackForDrawer,
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeNavigator;

// libs
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

// custom
import {CustomDrawerButton, CustomDrawerRight} from '../Components';
import {
  Community,
  GetPremium,
  HomeScreen,
  LogOut,
  Notifications,
  Settings,
} from '../Screens/MainScreens';
import {homeDrawerParamList} from '../Defs';
import {COLORS, ICONS, SIZES} from '../Constants';
import {Platform, View} from 'react-native';
import BackForDrawer from '../Components/Molecules/BackForDrawer';
import {styles} from './styles';
import {FONT_FAMILY} from '../Constants/commonStyles';

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
const Drawer = createDrawerNavigator<homeDrawerParamList>();
const HomeNavigator: React.FC = () => {
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
      }}>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
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
          drawerIcon: drawerIcon(ICONS.Notification),
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
      <Drawer.Screen
        name="LogOut"
        component={LogOut}
        options={{
          title: 'Logout',
          drawerIcon: drawerIcon(ICONS.LogOut),
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeNavigator;

// libs
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// custom
import { CustomDrawerButton, CustomDrawerRight } from "../Components";
import {
  Community,
  GetPremium,
  HomeScreen,
  LogOut,
  Notifications,
  Settings,
} from "../Screens/MainScreens";
import { appDrawerParamList } from "../Defs";
import { COLORS, ICONS, SIZES } from "../Constants";
import { View } from "react-native";

const iconSize = {
  width: 25,
  height: 25,
};
const drawerIcon = (
  icon: (size: {
    width: number;
    height: number;
    color?: string;
  }) => React.ReactNode
) => {
  return () => {
    return <View style={{ left: 20 }}>{icon(iconSize)}</View>;
  };
};
const Drawer = createDrawerNavigator<appDrawerParamList>();
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
        headerTitle: "",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
          height: 140,
        },
        headerLeft,
        drawerStyle: {
          justifyContent: "center",
        },
        drawerContentContainerStyle: {
          top: "25%",
        },
        drawerLabelStyle: { color: "black", fontSize: SIZES.font13 },
        drawerActiveTintColor: COLORS.PRIMARY.PURPLE,
      }}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          drawerIcon: drawerIcon(ICONS.Home),
          headerRight,
          headerStyle: {
            backgroundColor: COLORS.PRIMARY.DARK_GREY,
            height: 140,
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
          drawerIcon: drawerIcon(ICONS.Premium),
        }}
      />
      <Drawer.Screen
        name="LogOut"
        component={LogOut}
        options={{
          drawerIcon: drawerIcon(ICONS.LogOut),
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeNavigator;

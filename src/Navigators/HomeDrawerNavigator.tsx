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

const Drawer = createDrawerNavigator<appDrawerParamList>();
const iconSize = {
  width: 25,
  height: 25,
};
const HomeNavigator = () => {
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
        headerStyle: {
          backgroundColor: COLORS.PRIMARY.DARK_GREY,
          shadowOpacity: 0,
          height: 130,
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
          drawerIcon: () => {
            return <View style={{ left: 20 }}>{ICONS.Home(iconSize)}</View>;
          },
          headerRight,
        }}
      />
      <Drawer.Screen
        name="Community"
        component={Community}
        options={{
          drawerIcon: () => {
            return (
              <View style={{ left: 20 }}>{ICONS.Community(iconSize)}</View>
            );
          },
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{
          drawerIcon: () => {
            return (
              <View style={{ left: 20 }}>{ICONS.Notification(iconSize)}</View>
            );
          },
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: () => {
            return <View style={{ left: 20 }}>{ICONS.Settings(iconSize)}</View>;
          },
        }}
      />
      <Drawer.Screen
        name="GetPremium"
        component={GetPremium}
        options={{
          drawerIcon: () => {
            return <View style={{ left: 20 }}>{ICONS.Premium(iconSize)}</View>;
          },
        }}
      />
      <Drawer.Screen
        name="LogOut"
        component={LogOut}
        options={{
          drawerIcon: () => {
            return (
              <View style={{ left: 20, transform: [{ rotate: "180deg" }] }}>
                {ICONS.LogOut(iconSize)}
              </View>
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeNavigator;

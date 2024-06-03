// libs
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// custom
import { CustomDrawerButton, CustomDrawerRight } from "../Components";
import { appStackParamList } from "../Defs";
import { Home } from "../Screens/MainScreens";

const Drawer = createDrawerNavigator<appStackParamList>();

const AppNavigator = () => {
  const headerLeft = () => {
    return <CustomDrawerButton />;
  };
  const headerRight = () => {
    return <CustomDrawerRight />;
  };
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        title: "Home",
        headerTitle: "",
        headerStyle: {
          backgroundColor: "#ECECEC",
          shadowOpacity: 0,
          height: 150,
        },
        headerRight,
        headerLeft,
        drawerStyle: {
          borderWidth: 1,
          justifyContent: "center",
        },
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

export default AppNavigator;

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
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONT_FAMILY} from '../Constants/commonStyles';
import {useNavigation} from '@react-navigation/native';

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
    return <View style={{left: 20}}>{icon(iconSize)}</View>;
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

  // navigator use
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerTitle: '',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
          height:
            Platform.OS === 'ios' ? SIZES.height / 6.5 : SIZES.height / 10,
        },
        headerLeft,
        drawerStyle: {
          justifyContent: 'center',
        },
        drawerContentContainerStyle: {
          top: '25%',
        },
        drawerLabelStyle: {color: 'black', fontSize: SIZES.font13},
        drawerActiveTintColor: COLORS.PRIMARY.PURPLE,
        drawerType: 'front',
      }}>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
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
          drawerIcon: drawerIcon(ICONS.Premium),
          headerTransparent: true,
          headerShown: true,
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => navigation.goBack()}>
                {ICONS.LeftChevron({
                  width: RFValue(22),
                  height: RFValue(30),
                  color: '#317FFF',
                })}
                <Text
                  style={{
                    color: '#348AFE',
                    fontFamily: FONT_FAMILY.SEMI_BOLD,
                    fontSize: SIZES.font15,
                    fontWeight: 500,
                    left: -RFValue(3),
                  }}>
                  Back
                </Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Drawer.Screen
        name="LogOut"
        component={LogOut}
        options={{
          drawerIcon: drawerIcon(ICONS.LogOut),
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeNavigator;

// libs
import React from 'react';
import {View, TouchableOpacity} from 'react-native';

// 3rd party
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppSelector} from '../../../Redux/Store';
import {useNetInfo} from '@react-native-community/netinfo';

// custom
import CustomImage from '../CustomImage';
import {appStackParamList, homeDrawerParamList} from '../../../Defs';
import {styles} from './styles';
import {IMAGES} from '../../../Constants';

const CustomDrawerRight: React.FC = () => {
  // state use
  const {photo} = useAppSelector(state => state.User.data);

  // net info
  const {isConnected} = useNetInfo();

  // navigation use
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        DrawerNavigationProp<homeDrawerParamList>,
        NativeStackNavigationProp<appStackParamList>
      >
    >();

  // functions
  const handlePress = () => {
    navigation.navigate('EditProfile', {from: 'Home'});
  };
  return (
    <TouchableOpacity style={styles.parent} onPress={handlePress}>
      <CustomImage
        source={photo ? {uri: photo} : IMAGES.DEFAULT_USER}
        imageStyle={styles.image}
      />
      <View
        style={[
          styles.onlineStatus,
          !isConnected ? styles.onlineStatusNoInternet : null,
        ]}
      />
    </TouchableOpacity>
  );
};

export default CustomDrawerRight;

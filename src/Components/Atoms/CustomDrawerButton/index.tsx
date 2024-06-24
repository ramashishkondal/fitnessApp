// libs
import React from 'react';
import {TouchableOpacity} from 'react-native';

// 3rd party
import {useNavigation} from '@react-navigation/native';

// custom
import {homeDrawerParamList} from '../../../Defs/navigators';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ICONS} from '../../../Constants';
import {styles} from './styles';

const CustomDrawerButton: React.FC = () => {
  // navigation hook
  const navigation = useNavigation<DrawerNavigationProp<homeDrawerParamList>>();

  // functions
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <TouchableOpacity onPress={openDrawer} style={styles.parent}>
      {ICONS.Drawer({width: 25, height: 25})}
    </TouchableOpacity>
  );
};

export default CustomDrawerButton;

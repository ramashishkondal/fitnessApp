import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {ICONS} from '../../../Constants';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';

const BackForDrawer = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.parent} onPress={() => navigation.goBack()}>
      {ICONS.LeftChevron({
        width: RFValue(22),
        height: RFValue(30),
        color: '#317FFF',
      })}
      <Text style={styles.text}>Back</Text>
    </TouchableOpacity>
  );
};

export default BackForDrawer;

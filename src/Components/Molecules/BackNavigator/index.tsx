import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {ICONS} from '../../../Constants';
import {BackNavigatorProps} from './types';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';

const size = {
  width: RFValue(22),
  height: RFValue(30),
  color: '#317FFF',
};
const BackNavigator: React.FC<BackNavigatorProps> = ({canGoBack}) => {
  const navigation = useNavigation();
  if (canGoBack) {
    return (
      <TouchableOpacity
        style={styles.parent}
        onPress={() => navigation.goBack()}>
        {ICONS.LeftChevron(size)}
        <Text style={styles.title}>Back</Text>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
};

export default BackNavigator;

import React from 'react';
import {Text, View} from 'react-native';
import {CustomCardUserItemsProps} from './types';
import {styles} from './styles';

const CustomCardUserItems: React.FC<CustomCardUserItemsProps> = ({text}) => {
  return (
    <View style={styles.parent}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default React.memo(CustomCardUserItems);

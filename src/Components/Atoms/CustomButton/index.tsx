// libs
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

// custom
import CustomLoading from '../CustomLoading';
import {CustomButtonProps} from './types';
import {styles} from './styles';

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  parentStyle,
  buttonCtrStyle,
  textStyle,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      style={[styles.parent, parentStyle]}
      onPress={isLoading ? () => {} : onPress}>
      <View style={[styles.buttonCtr, buttonCtrStyle]}>
        {isLoading ? (
          <CustomLoading />
        ) : (
          <Text style={[styles.text, textStyle]}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(CustomButton);

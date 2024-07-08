// libs
import React from 'react';
import {TextInput, View} from 'react-native';

// 3rd party
import Animated from 'react-native-reanimated';

// custom
import {styles} from './styles';
import {CustomTextInputProps} from './types';
import {COLORS} from '../../../Constants';

const CustomTextInput: React.FC<CustomTextInputProps> = React.memo(
  ({
    placeHolder,
    parentStyle,
    iconCtrStyle,
    textInputStyle,
    onChangeText,
    icon,
    autoFocus,
    hasError,
    value,
    textInputProps,
  }) => {
    return (
      <Animated.View
        style={[
          styles.parent,
          parentStyle,
          hasError ? styles.parentError : null,
        ]}>
        {icon ? (
          <View style={[styles.iconCtr, iconCtrStyle]}>{icon}</View>
        ) : null}
        <TextInput
          placeholder={placeHolder}
          style={[styles.textInput, textInputStyle]}
          placeholderTextColor={COLORS.PRIMARY.DARK_GREY}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={autoFocus}
          value={value}
          {...textInputProps}
        />
      </Animated.View>
    );
  },
);

export default CustomTextInput;

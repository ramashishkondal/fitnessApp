// libs
import React, {useState} from 'react';
import {TextInput, View} from 'react-native';

// 3rd party
import Animated from 'react-native-reanimated';

// custom
import {styles} from './styles';
import {CustomTextInputProps} from './types';
import {COLORS, ICONS} from '../../../Constants';
import {TouchableOpacity} from 'react-native-gesture-handler';

const eyeIconSize = {
  width: 18,
  height: 18,
};
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
    allowPeeking = false,
    textInputProps,
  }) => {
    // state use
    const [isTextSecure, setIsTextSecure] = useState(allowPeeking);

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
          secureTextEntry={isTextSecure}
          {...textInputProps}
        />
        {allowPeeking ? (
          <TouchableOpacity
            style={[styles.iconCtr, iconCtrStyle]}
            onPress={() => setIsTextSecure(!isTextSecure)}>
            {isTextSecure
              ? ICONS.EyeClose(eyeIconSize)
              : ICONS.EyeOpen(eyeIconSize)}
          </TouchableOpacity>
        ) : null}
      </Animated.View>
    );
  },
);

export default CustomTextInput;

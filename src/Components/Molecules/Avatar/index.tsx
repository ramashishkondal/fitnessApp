// libs
import React from 'react';
import {Pressable, Image} from 'react-native';

// 3rd party
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';

// custom
import {ANIMATIONS} from '../../../Constants';
import {styles} from './styles';
import {AvatarProps} from './types';

const Avatar: React.FC<AvatarProps> = ({
  item,
  selectedItem,
  setSelectedItem,
  setPhoto,
}) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));
  const handleOnPress = () => {
    scale.value = withSequence(
      withSpring(ANIMATIONS.sizeIncrease2),
      withSpring(ANIMATIONS.sizeNormal),
    );
    setSelectedItem(item.name);
    setPhoto(item.name);
    console.log('photo item is ', item);
  };
  return (
    <Animated.View style={[styles.parent, animatedStyle]}>
      <Pressable
        style={[
          styles.avatarCtr,
          selectedItem === item.name ? styles.avatarSelected : null,
        ]}
        onPress={handleOnPress}>
        <Image source={item.image} style={styles.image} />
      </Pressable>
    </Animated.View>
  );
};

export default Avatar;

// libs
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// 3rd party
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

// custom
import {styles} from './styles';
import {ANIMATIONS} from '../../../Constants';
import {InterestItemProps} from './types';

const InterestItem: React.FC<InterestItemProps> = ({item}) => {
  // state ues
  const [isSelected, setIsSelected] = useState<boolean>(false);

  // reanimated use
  const scale = useSharedValue(ANIMATIONS.sizeNormal);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  // functions
  const handlePress = () => {
    setIsSelected(!isSelected);
    item.selected = !item.selected;
    scale.value = withSequence(
      withSpring(ANIMATIONS.sizeIncrease3),
      withSpring(ANIMATIONS.sizeNormal),
    );
  };

  return (
    <View style={styles.parent}>
      <TouchableOpacity style={styles.child} onPress={handlePress}>
        <Animated.View
          style={[
            styles.iconCtr,
            isSelected ? styles.iconCtrSelected : null,
            animatedStyle,
          ]}>
          {item.icon}
        </Animated.View>
        <View style={styles.textCtr}>
          <Text style={styles.text}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InterestItem;

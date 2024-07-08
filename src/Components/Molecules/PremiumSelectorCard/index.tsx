import React from 'react';
import {Pressable, Text, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox/build/dist/BouncyCheckbox';
import {ANIMATIONS, COLORS} from '../../../Constants';
import {PremiumSelectorCardProps} from './types';
import {styles} from './styles';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

const PremiumSelectorCard: React.FC<PremiumSelectorCardProps> = ({
  priceText,
  priceIntervalTime,
  isChecked,
  setIsChecked,
}) => {
  // reanimated use
  const scale = useSharedValue(ANIMATIONS.sizeNormal);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  // functions
  const handleOnPress = () => {
    setIsChecked(!isChecked);
    scale.value = withSequence(
      withSpring(ANIMATIONS.sizeIncrease1),
      withSpring(ANIMATIONS.sizeNormal),
    );
  };

  return (
    <Pressable onPress={handleOnPress} style={styles.pressable}>
      <Animated.View style={[styles.parent, animatedStyle]}>
        <View style={styles.selectorCtr}>
          <BouncyCheckbox
            size={25}
            fillColor={COLORS.PRIMARY.PURPLE}
            unFillColor={COLORS.SECONDARY.WHITE}
            innerIconStyle={{borderColor: COLORS.SECONDARY.WHITE}}
            onPress={handleOnPress}
            isChecked={isChecked}
            disableText
          />
          <View style={styles.priceCtr}>
            <Text style={styles.freeTrialtext}>
              ${priceText}
              <Text style={styles.outOfText}>/{priceIntervalTime}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.freeTrialCtr}>
          <Text style={styles.freeTrialtext}>Free Trial</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default PremiumSelectorCard;

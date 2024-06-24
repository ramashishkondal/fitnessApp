import React from 'react';
import {Text, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox/build/dist/BouncyCheckbox';
import {COLORS} from '../../../Constants';
import {PremiumSelectorCardProps} from './types';
import {styles} from './styles';

const PremiumSelectorCard: React.FC<PremiumSelectorCardProps> = ({
  priceText,
  priceIntervalTime,
  isChecked,
  setIsChecked,
}) => {
  // functions
  const handleOnPress = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.parent}>
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
    </View>
  );
};

export default PremiumSelectorCard;

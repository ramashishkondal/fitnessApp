import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {SettingsCardProps} from './types';
import {COLORS} from '../../../Constants/commonStyles';
import {Switch} from 'react-native-switch';
import {styles} from './styles';
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {updateSettingPushNotification} from '../../../Redux/Reducers/userSettings';

const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  hasSwitch = false,
  onPress,
}) => {
  // redux use
  const dispatch = useAppDispatch();
  const {allowPushNotifications} = useAppSelector(state => state.settings.data);

  // state use
  const [switchActive, setSwitchActive] = useState(allowPushNotifications);

  return (
    <Pressable style={styles.parent} onPress={onPress}>
      <Text style={styles.headingText}>{title}</Text>
      {hasSwitch ? (
        <View
          style={[
            styles.switchCtr,
            switchActive ? null : styles.switchCtrActive,
          ]}>
          <Switch
            value={switchActive}
            onValueChange={val => {
              setSwitchActive(val);
              dispatch(updateSettingPushNotification(val));
            }}
            disabled={false}
            circleSize={32}
            barHeight={32}
            circleBorderWidth={2}
            circleBorderActiveColor="#4CD965"
            circleBorderInactiveColor={COLORS.PRIMARY.LIGHT_GREY}
            backgroundActive={'#4CD965'}
            backgroundInactive={COLORS.PRIMARY.LIGHT_GREY}
            circleActiveColor={COLORS.SECONDARY.WHITE}
            circleInActiveColor={'#ffff'}
            changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
            innerCircleStyle={styles.switchInnerCircle} // style for inner animated circle for what you (may) be rendering inside the circle
            renderActiveText={false}
            renderInActiveText={false}
            switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
            switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
            switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
            switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
          />
        </View>
      ) : null}
    </Pressable>
  );
};

export default SettingsCard;

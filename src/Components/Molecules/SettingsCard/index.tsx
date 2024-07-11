import React, {useState} from 'react';
import {View, Text, Pressable, Linking, Alert, Platform} from 'react-native';
import {SettingsCardProps} from './types';
import {COLORS} from '../../../Constants/commonStyles';
import {Switch} from 'react-native-switch';
import {styles} from './styles';
import {useAppDispatch} from '../../../Redux/Store';
import {updateSettingPushNotification} from '../../../Redux/Reducers/userSettings';
import {PERMISSIONS, check, request} from 'react-native-permissions';
import RNRestart from 'react-native-restart';

const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  hasSwitch = false,
  onPress,
}) => {
  // redux use
  const dispatch = useAppDispatch();
  // const {allowPushNotifications} = useAppSelector(state => state.settings.data);

  // state use
  const [switchActive, setSwitchActive] = useState(false);

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
            onValueChange={async val => {
              if (Platform.OS === 'android' && Platform.Version >= 33) {
                const notificationPerm = await check(
                  PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
                );
                if (notificationPerm === 'granted' || val === false) {
                  setSwitchActive(val);
                  dispatch(updateSettingPushNotification(val));
                }
                if (val && notificationPerm !== 'granted') {
                  const notificationAuth = await request(
                    PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
                  );
                  if (notificationAuth === 'granted') {
                    setSwitchActive(val);
                    dispatch(updateSettingPushNotification(val));
                  }
                  if (notificationAuth === 'blocked') {
                    Alert.alert(
                      'Notifications permissions denied',
                      'You have to allow Notification permissions from the App settings to use notification feature of the app',
                      [
                        {
                          text: 'Ok',
                          onPress: () => {
                            Alert.alert(
                              'Restart App',
                              'The app needs to be restarted to apply any changes made to the permissions. Please click "OK" to restart now.',
                              [
                                {text: 'OK', onPress: RNRestart.restart},
                                {text: 'Cancel'},
                              ],
                            );

                            Linking.openSettings();
                          },
                        },
                        {
                          text: 'Cancel',
                        },
                      ],
                    );
                  }
                }
              } else {
                setSwitchActive(val);
                dispatch(updateSettingPushNotification(val));
              }
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

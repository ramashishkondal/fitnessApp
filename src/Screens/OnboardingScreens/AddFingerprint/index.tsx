// libs
import React, {useEffect} from 'react';
import {Alert, Platform, View} from 'react-native';

// custom
import {
  CustomButton,
  WithOnboarding,
  DescriptionText,
  HeadingText,
} from '../../../Components';
import {COLORS, ICONS, SPACING, STRING} from '../../../Constants';
import {styles} from './styles';
import {AddProfilePictureProps} from '../../../Defs';
import {useAppDispatch} from '../../../Redux/Store';
import {updateUserData} from '../../../Redux/Reducers/currentUser';

const iconSize = {width: 80, height: 80, color: COLORS.PRIMARY.PURPLE};
const AddFingerprint: React.FC<AddProfilePictureProps> = ({navigation}) => {
  // redux use
  const dispatch = useAppDispatch();

  // functions
  const goToAddProfilePicture = () => {
    navigation.push('AddProfilePicture');
  };
  const handleBiometricAdded = () => {
    Alert.alert(
      `${Platform.OS === 'android' ? 'Fingerprint' : 'Face ID'}`,
      `${
        Platform.OS === 'android' ? 'Fingerprint' : 'Face ID'
      } login on this device enabled`,
      [
        {
          text: 'Ok',
          onPress: () => {
            dispatch(updateUserData({finger: true}));
            goToAddProfilePicture();
          },
        },
      ],
    );
  };
  const handleNotNow = () => {
    dispatch(updateUserData({finger: false}));
    goToAddProfilePicture();
  };
  useEffect(() => {
    return () => {
      dispatch(updateUserData({finger: false}));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.parent}>
      <View style={styles.iconCtr}>
        {Platform.OS === 'android'
          ? ICONS.Fingerprint(iconSize)
          : ICONS.FaceId(iconSize)}
      </View>
      <HeadingText
        text={STRING.ADD_FINGERPRINT.TITLE}
        textStyle={SPACING.mt3}
      />
      <DescriptionText
        text={STRING.ADD_FINGERPRINT.TITLE_DESCRIPTION}
        textStyle={styles.titleDescriptionText}
      />
      <CustomButton
        title={STRING.ADD_FINGERPRINT.SUBMIT_BUTTON_TEXT}
        parentStyle={styles.customButtonParentStyle}
        onPress={handleBiometricAdded}
      />
      <CustomButton
        title={STRING.ADD_FINGERPRINT.REJECT_BUTTON_TEXT}
        parentStyle={styles.notNowParent}
        textStyle={styles.notNowText}
        onPress={handleNotNow}
      />
    </View>
  );
};

export default WithOnboarding(AddFingerprint);

// libs
import React, {useEffect} from 'react';
import {
  Alert,
  NativeEventEmitter,
  NativeModules,
  Platform,
  View,
} from 'react-native';

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
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {updateSettingsCachedData} from '../../../Redux/Reducers/userSettings';
import ToastError from '../../../Components/Atoms/ToastError';

const iconSize = {width: 80, height: 80, color: COLORS.PRIMARY.PURPLE};
const AddFingerprint: React.FC<AddProfilePictureProps> = ({navigation}) => {
  // redux use
  const dispatch = useAppDispatch();
  const {isBiometricEnabled} = useAppSelector(
    state => state.settings.data.cachedData,
  );

  useEffect(() => {
    if (Platform.OS === 'android') {
      const {FingerPrintModule} = NativeModules;
      const fingerPrintEventEmitter = new NativeEventEmitter(FingerPrintModule);
      const onAuthSuccess = () => {
        console.log('Authentication Succeeded:');
        dispatch(updateSettingsCachedData({isBiometricEnabled: true}));
        goToAddProfilePicture();
        // Handle successful authentication
      };

      const onAuthError = () => {
        console.log('Authentication Error:');
        dispatch(updateSettingsCachedData({isBiometricEnabled: false}));
        // Handle authentication error
      };

      const onAuthFailed = () => {
        console.log('Authentication Failed:');
        dispatch(updateSettingsCachedData({isBiometricEnabled: false}));
        // Handle authentication failure
      };

      const authSuccessListener = fingerPrintEventEmitter.addListener(
        'auth_success',
        onAuthSuccess,
      );

      const authErrorListener = fingerPrintEventEmitter.addListener(
        'auth_error',
        onAuthError,
      );

      const authFailedListener = fingerPrintEventEmitter.addListener(
        'auth_failed',
        onAuthFailed,
      );
      return () => {
        authSuccessListener.remove();
        authErrorListener.remove();
        authFailedListener.remove();
      };
    }
  }, [dispatch]);
  const handleBiometric = async (val: boolean) => {
    if (Platform.OS === 'android') {
      const handleErrorBiometric = (error: string) => {
        console.log('error in auth fingerprint', error);
      };

      dispatch(
        updateSettingsCachedData({isBiometricEnabled: !isBiometricEnabled}),
      );
      console.log('bio', val);
      if (!val) {
        NativeModules.FingerPrintModule.authenticateFingerPrint().catch(
          handleErrorBiometric,
        );
      }
      return;
    } else {
      try {
        dispatch(
          updateSettingsCachedData({isBiometricEnabled: !isBiometricEnabled}),
        );
        if (val) {
          await NativeModules.FaceIdModule.authenticateWithFaceID();
          goToAddProfilePicture();
        }
      } catch (error: any) {
        dispatch(updateSettingsCachedData({isBiometricEnabled: false}));
        if (error.message === 'Authentication failed') {
          return;
        }
        if (error.code === 'auth/network-request-failed') {
          ToastError('Authentication Error', error.code);
          return;
        }
        ToastError('Authentication Error', error.message);
      }
    }
  };

  // functions
  const goToAddProfilePicture = () => {
    navigation.push('AddProfilePicture');
  };
  // const handleBiometricAdded = () => {
  //   Alert.alert(
  //     `${Platform.OS === 'android' ? 'Fingerprint' : 'Face ID'}`,
  //     `${
  //       Platform.OS === 'android' ? 'Fingerprint' : 'Face ID'
  //     } login on this device enabled`,
  //     [
  //       {
  //         text: 'Ok',
  //         onPress: () => {
  //           dispatch(updateSettingsCachedData({isBiometricEnabled: true}));

  //           goToAddProfilePicture();
  //         },
  //       },
  //     ],
  //   );
  // };
  const handleNotNow = () => {
    dispatch(updateSettingsCachedData({isBiometricEnabled: false}));
    goToAddProfilePicture();
  };
  console.log(isBiometricEnabled);

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
        onPress={() => {
          // if (isBiometricEnabled) {
          //   Alert.alert(
          //     `${Platform.OS === 'android' ? 'Fingerprint' : 'Face ID'}`,
          //     `${
          //       Platform.OS === 'android' ? 'Fingerprint' : 'Face ID'
          //     } login on this device enabled.`,
          //     [
          //       {
          //         text: 'Ok',
          //         onPress: () => {
          //           goToAddProfilePicture();
          //         },
          //       },
          //     ],
          //   );
          //   return;
          // }
          handleBiometric(isBiometricEnabled);
        }}
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

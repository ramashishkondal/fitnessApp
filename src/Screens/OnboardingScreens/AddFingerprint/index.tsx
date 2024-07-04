// libs
import React from 'react';
import {View} from 'react-native';

// custom
import {
  CustomButton,
  WithOnboarding,
  DescriptionText,
  HeadingText,
} from '../../../Components';
import {ICONS, SPACING, STRING} from '../../../Constants';
import {styles} from './styles';
import {AddProfilePictureProps} from '../../../Defs';
import {useAppDispatch} from '../../../Redux/Store';
import {updateUserData} from '../../../Redux/Reducers/currentUser';

const fingerprintSize = 75;
const AddFingerprint: React.FC<AddProfilePictureProps> = ({navigation}) => {
  // redux use
  const dispatch = useAppDispatch();

  // functions
  const goToAddProfilePicture = () => {
    navigation.push('AddProfilePicture');
  };
  const handleBiometricAdded = () => {
    dispatch(updateUserData({finger: true}));
    goToAddProfilePicture();
  };

  return (
    <View style={styles.parent}>
      <View style={styles.iconCtr}>
        {ICONS.Fingerprint({width: fingerprintSize, height: fingerprintSize})}
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
        onPress={goToAddProfilePicture}
      />
    </View>
  );
};

export default WithOnboarding(AddFingerprint);

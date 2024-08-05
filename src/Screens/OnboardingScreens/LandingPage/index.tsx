//libs
import React from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';

// custom
import {
  CustomButton,
  WithOnboarding,
  DescriptionText,
  HeadingText,
} from '../../../Components';
import {SPACING, STRING, IMAGES} from '../../../Constants/';
import {LandingPageProps} from '../../../Defs';
import {styles} from './styles';
import {useNetInfo} from '@react-native-community/netinfo';
import {useAppDispatch} from '../../../Redux/Store';
import {updateSettingsCachedData} from '../../../Redux/Reducers/userSettings';

const LandingPage: React.FC<LandingPageProps> = ({navigation}) => {
  const netInfo = useNetInfo();
  const dispatch = useAppDispatch();
  // functions
  const goToSignIn = () => {
    dispatch(updateSettingsCachedData({shouldSignIn: true}));
    navigation.push('SignIn');
  };
  const goToStarting = () => {
    if (netInfo.isConnected) {
      dispatch(updateSettingsCachedData({shouldSignIn: false}));
      navigation.navigate('AddEmail');
    } else {
      Alert.alert(
        STRING.COMMON_ERRORS.NETWORK_ERROR.TITLE,
        STRING.COMMON_ERRORS.NETWORK_ERROR.BODY,
      );
    }
  };

  return (
    <View style={styles.parent}>
      <HeadingText text={STRING.LANDING_PAGE.TITLE} />
      <DescriptionText
        text={STRING.LANDING_PAGE.TITLE_DESCRIPTION}
        textStyle={[SPACING.mh2, SPACING.mt1]}
      />
      <Image
        source={IMAGES.LANDING_PAGE}
        style={styles.image}
        resizeMode="contain"
      />
      <CustomButton
        title={STRING.LANDING_PAGE.BUTTON_TEXT}
        parentStyle={SPACING.mt4}
        onPress={goToStarting}
      />
      <View style={styles.signInInsteadCtr}>
        <Text style={[styles.signInText1, SPACING.mV2]}>
          {STRING.LANDING_PAGE.SIGNIN_1}
        </Text>
        <TouchableOpacity style={styles.signInTextCtr} onPress={goToSignIn}>
          <Text style={styles.signInText2}>{STRING.LANDING_PAGE.SIGNIN_2}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WithOnboarding(LandingPage);

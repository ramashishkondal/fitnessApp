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

const LandingPage: React.FC<LandingPageProps> = ({navigation}) => {
  const netInfo = useNetInfo();
  // functions
  const goToSignIn = () => {
    navigation.push('SignIn');
  };
  const goToStarting = () => {
    if (netInfo.isConnected) {
      navigation.navigate('AddEmail');
    } else {
      Alert.alert('Network Error', 'Internet connection is disabled');
    }
  };

  return (
    <View style={styles.parent}>
      <HeadingText text={STRING.LANDING_PAGE.TITLE} />
      <DescriptionText
        text={STRING.LANDING_PAGE.TITLE_DESCRIPTION}
        textStyle={[SPACING.mh2, SPACING.mt1]}
      />
      <Image source={IMAGES.LANDING_PAGE} style={styles.image} />
      <CustomButton
        title={STRING.LANDING_PAGE.BUTTON_TEXT}
        parentStyle={SPACING.mt4}
        onPress={goToStarting}
      />
      <TouchableOpacity style={styles.signInTextCtr} onPress={goToSignIn}>
        <Text style={[styles.signInText1, SPACING.m2]}>
          {STRING.LANDING_PAGE.SIGNIN_1}{' '}
          <Text style={styles.signInText2}>{STRING.LANDING_PAGE.SIGNIN_2}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WithOnboarding(LandingPage);

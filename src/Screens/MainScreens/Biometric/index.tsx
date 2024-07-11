import React, {useEffect} from 'react';
import {Platform, NativeModules, Alert, Text, View} from 'react-native';
import {styles} from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Biometric = () => {
  useEffect(() => {
    handleBiometricAuth();
  }, []);

  const handleBiometricAuth = () => {
    if (Platform.OS === 'android') {
      NativeModules.FingerPrintModule.doSomething();
    } else {
      const handleFaceIDAuthentication = async () => {
        try {
          const result =
            await NativeModules.FaceIdModule.authenticateWithFaceID();
          Alert.alert('Authentication Success', result);
        } catch (error: any) {
          Alert.alert('Authentication Error', error.message);
        }
      };
      handleFaceIDAuthentication();
    }
  };
  return (
    <View style={styles.parent}>
      <Text>App Locked</Text>
      <TouchableOpacity onPress={handleBiometricAuth}>
        <Text>{Platform.OS === 'ios' ? 'Use Face ID' : 'Use Fingerprint'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Biometric;

// libs
import React, {useState} from 'react';
import {Alert, View} from 'react-native';

// 3rd party
import auth from '@react-native-firebase/auth';

// custom
import {CustomTextInput, CustomButton, HeadingText} from '../../../Components';
import {SPACING, STRING} from '../../../Constants';
import {styles} from './styles';
import {useAppSelector} from '../../../Redux/Store';
import {isValidPassword} from '../../../Utils/checkValidity';
import {useNetInfo} from '@react-native-community/netinfo';
import {ResetPasswordProps} from '../../../Defs/navigators';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ResetPassword: React.FC<ResetPasswordProps> = ({navigation}) => {
  // state use
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // netInfo use
  const netInfo = useNetInfo();

  // redux use
  const {email} = useAppSelector(state => state.User.data);

  // functions
  const handleSubmit = async () => {
    if (!netInfo.isConnected) {
      Alert.alert('Network Error', 'Internet connection is disabled');
      return;
    }
    if (password === '') {
      Alert.alert('Error', "Password can't be empty");
      return;
    }
    if (newPassword === '') {
      Alert.alert('Error', "New password can't be empty");
      return;
    }
    if (newPassword === password) {
      Alert.alert(
        'Error',
        'The new password you entered is the same as the current password.',
      );
      return;
    }
    if (!isValidPassword.lengthCheck(newPassword)) {
      Alert.alert(
        'Invalid new password entered',
        'Ensure the entered password is at least six characters long.',
      );
      return;
    }
    setIsLoading(true);
    const user = auth().currentUser;

    const credential = auth.EmailAuthProvider.credential(email, password);
    if (user) {
      user
        .reauthenticateWithCredential(credential)
        .then(() => {
          // User re-authenticated.
          console.log('user authenticated');
          user
            .updatePassword(newPassword)
            .then(() => {
              Alert.alert('Success', 'Password changed successfully');
              navigation.goBack();
            })
            .catch(e => {
              console.log('error updating the password', e);
            });
        })
        .catch(error => {
          // An error happened.
          console.log('error', error);
          Alert.alert('Error', 'The current password provided does not match.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.parent}>
      <View style={[styles.child, SPACING.mt5, SPACING.mh1]}>
        <HeadingText text="Reset Password" />
        <CustomTextInput
          value={password}
          placeHolder="Enter current password"
          parentStyle={[SPACING.mh2, SPACING.mt5]}
          textInputStyle={styles.textInput}
          onChangeText={setPassword}
          autoFocus
          allowPeeking
        />
        <CustomTextInput
          value={newPassword}
          placeHolder="Enter new Password"
          parentStyle={[SPACING.mh2, SPACING.mt5]}
          textInputStyle={styles.textInput}
          onChangeText={setNewPassword}
          allowPeeking
        />
        <CustomButton
          title={STRING.ADD_EMAIL.BUTTON_TEXT}
          parentStyle={SPACING.mtXLarge}
          onPress={handleSubmit}
          isLoading={isLoading}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ResetPassword;

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

const ResetPassword: React.FC = () => {
  // state use
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // redux use
  const {email} = useAppSelector(state => state.User.data);

  // functions
  const handleSubmit = async () => {
    setIsLoading(true);
    const user = auth().currentUser;

    const credential = auth.EmailAuthProvider.credential(email, password);
    if (user) {
      user
        .reauthenticateWithCredential(credential)
        .then(() => {
          // User re-authenticated.
          console.log('user authenticated');
          if (newPassword === '') {
            Alert.alert('Error', "New password can't be empty");
          }
          if (isValidPassword.checkAllValidations(newPassword)) {
            user
              .updatePassword(newPassword)
              .then(() => {
                Alert.alert('Success', 'Password changed successfully');
                auth().signOut();
              })
              .catch(e => {
                console.log('error updating the password', e);
              });
          } else {
            Alert.alert(
              'Error',
              'Invalid password entered make sure the password entered is valid',
            );
          }
        })
        .catch(error => {
          // An error happened.
          console.log('error', error);
          Alert.alert('Error', 'Wrong password entered');
        });
    }

    setIsLoading(false);
  };

  return (
    <View style={styles.parent}>
      <View style={[styles.child, SPACING.mt5, SPACING.mh1]}>
        <HeadingText text="Reset Password" />
        <CustomTextInput
          placeHolder="Enter current password"
          parentStyle={[SPACING.mh2, SPACING.mt5]}
          textInputStyle={styles.textInput}
          onChangeText={setPassword}
          autoFocus
        />
        <CustomTextInput
          placeHolder="Enter new Password"
          parentStyle={[SPACING.mh2, SPACING.mt5]}
          textInputStyle={styles.textInput}
          onChangeText={setNewPassword}
        />
        <CustomButton
          title={STRING.ADD_EMAIL.BUTTON_TEXT}
          parentStyle={SPACING.mtXLarge}
          onPress={handleSubmit}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

export default ResetPassword;

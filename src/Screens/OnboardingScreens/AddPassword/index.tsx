// libs
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './styles';
import {AppState, View} from 'react-native';

// 3rd party
import {useAppDispatch} from '../../../Redux/Store';
import {updateUserData} from '../../../Redux/Reducers/currentUser';

// custom
import {
  CustomButton,
  CustomTextInput,
  PasswordChecks,
  HeadingText,
} from '../../../Components';
import {COLORS, ICONS, SIZES, SPACING, STRING} from '../../../Constants';
import {isValidPassword} from '../../../Utils/checkValidity';
import {AddPasswordProps} from '../../../Defs';
import ToastError from '../../../Components/Atoms/ToastError';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AddPassword: React.FC<AddPasswordProps> = ({navigation}) => {
  // state use
  const [password, setPassword] = useState<string>('');

  // redux use
  const dispatch = useAppDispatch();

  // functions
  const handleSubmit = () => {
    if (password === '') {
      ToastError(
        STRING.ADD_PASSWORD.ERROR.HEADING,
        STRING.ADD_PASSWORD.ERROR.EMPTY,
      );
      return;
    }
    if (!isValidPassword.lengthCheck(password)) {
      ToastError(
        STRING.ADD_PASSWORD.ERROR.HEADING,
        STRING.ADD_PASSWORD.ERROR.BODY_LENGTH,
      );
      return;
    }

    dispatch(updateUserData({password}));
    navigation.push('AddFirstName');
  };
  // App state listener
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      style={{flex: 1, backgroundColor: COLORS.PRIMARY.GREY}}>
      <View style={[styles.parent, SPACING.mt5, SPACING.mh2]}>
        {appStateVisible !== 'active' && (
          <View style={styles.absolute}>
            {ICONS.EyeClose({
              width: SIZES.width / 4,
              height: SIZES.width / 4,
              color: COLORS.SECONDARY.GREY,
            })}
          </View>
        )}
        <HeadingText text={STRING.ADD_PASSWORD.TITLE} textStyle={SPACING.mh1} />
        <CustomTextInput
          placeHolder={STRING.ADD_PASSWORD.TEXT_INPUT_PLACEHOLDER}
          parentStyle={[[SPACING.mt64, {marginHorizontal: 12}]]}
          textInputStyle={styles.textInput}
          onChangeText={setPassword}
          autoFocus
          allowPeeking
          textInputProps={{maxLength: 30}}
        />
        <PasswordChecks lengthCheck={isValidPassword.lengthCheck(password)} />
        <CustomButton
          title={STRING.ADD_PASSWORD.BUTTON_TEXT}
          parentStyle={SPACING.mt96}
          onPress={handleSubmit}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddPassword;

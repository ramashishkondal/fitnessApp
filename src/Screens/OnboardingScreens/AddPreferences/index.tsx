// libs
import React, {useRef} from 'react';
import {View} from 'react-native';

// custom
import {
  CustomButton,
  PreferenceItem,
  WithOnboarding,
  DescriptionText,
  HeadingText,
} from '../../../Components';
import {styles} from './styles';
import {SPACING, STRING} from '../../../Constants';
import {AddPreferencesProps} from '../../../Defs';
import {useAppDispatch} from '../../../Redux/Store';
import {updateUserData} from '../../../Redux/Reducers/currentUser';

const AddPreferences: React.FC<AddPreferencesProps> = ({navigation}) => {
  // ref use
  const PREFERENCES = useRef([
    {title: 'Weight Loss', selected: false},
    {title: 'Better sleeping habit', selected: false},
    {title: 'Track my nutrition', selected: false},
    {title: 'Improve overall fitness', selected: false},
  ]);

  // redux use
  const dispatch = useAppDispatch();

  // functions
  const Preferences = PREFERENCES.current.map((val, index) => (
    <PreferenceItem item={val} key={index} />
  ));
  const goToAddInterests = () => {
    dispatch(
      updateUserData({
        preferences: PREFERENCES.current,
      }),
    );
    navigation.push('AddInterests');
  };

  return (
    <View style={styles.parent}>
      <HeadingText
        text={STRING.ADD_PREFERENCES.TITLE}
        textStyle={SPACING.mh2}
      />
      <DescriptionText
        text={STRING.ADD_PREFERENCES.TITLE_DESCRIPTION}
        textStyle={SPACING.mt1}
      />
      {Preferences}
      <CustomButton
        title={STRING.ADD_PREFERENCES.BUTTON_TEXT}
        parentStyle={styles.customButtonParentStyle}
        onPress={goToAddInterests}
      />
    </View>
  );
};

export default WithOnboarding(AddPreferences);

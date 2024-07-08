// libs
import React, {useState} from 'react';
import {Alert, View} from 'react-native';

// custom
import {CustomTextInput, CustomButton, HeadingText} from '../../../Components';
import {SPACING} from '../../../Constants';
import {styles} from './styles';

const GiveFeedback: React.FC = () => {
  // state use
  const [feedback, setFeedback] = useState('');

  // functions
  const handleSubmit = () => {
    if (feedback.trim() === '') {
      Alert.alert('Error', 'Feedback is empty');
    } else {
      Alert.alert('Success', 'Feedback has been submitted');
      setFeedback('');
    }
  };

  return (
    <View style={styles.parent}>
      <View style={[styles.child, SPACING.mt5, SPACING.mh1]}>
        <HeadingText text="Give Feedback" />
        <CustomTextInput
          value={feedback}
          placeHolder="Send feedback"
          parentStyle={[SPACING.mh2, SPACING.mt5]}
          textInputStyle={styles.textInput}
          onChangeText={setFeedback}
          autoFocus
          textInputProps={{multiline: true, maxLength: 250}}
        />
        <CustomButton
          title={'Submit'}
          parentStyle={SPACING.mtXLarge}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default GiveFeedback;

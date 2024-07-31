// libs
import React from 'react';
import {View} from 'react-native';

// custom
import {SPACING, STRING} from '../../../Constants';
import {DescriptionText} from '../../Atoms';
import {PasswordChecksProps} from './types';
import {styles} from './styles';

const PasswordChecks = ({lengthCheck}: PasswordChecksProps) => {
  return (
    <View style={[styles.parent, SPACING.mt1]}>
      <View style={styles.childCtr}>
        <View
          style={[styles.square, lengthCheck ? styles.squareChecked : null]}
        />
        <DescriptionText
          text={STRING.ADD_PASSWORD.CHECKS.LENGTH}
          textStyle={styles.text}
        />
      </View>
      {/* <View style={styles.childCtr}>
        <View
          style={[styles.square, caseCheck ? styles.squareChecked : null]}
        />
        <DescriptionText
          text={STRING.ADD_PASSWORD.CHECKS.CASE}
          textStyle={styles.text}
        />
      </View>
      <View style={styles.childCtr}>
        <View
          style={[styles.square, numberCheck ? styles.squareChecked : null]}
        />
        <DescriptionText
          text={STRING.ADD_PASSWORD.CHECKS.NUMBER}
          textStyle={styles.text}
        />
      </View>
      <View style={styles.childCtr}>
        <View
          style={[
            styles.square,
            specialCharCheck ? styles.squareChecked : null,
          ]}
        />
        <DescriptionText
          text={STRING.ADD_PASSWORD.CHECKS.SPECIAL_CHAR}
          textStyle={styles.text}
        />
      </View> */}
    </View>
  );
};

export default PasswordChecks;

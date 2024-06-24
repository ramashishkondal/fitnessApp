import React from 'react';
import {View} from 'react-native';
import {ChangeUserPreferencesProps} from './types';
import PreferenceItem from '../PreferenceItem';
import {preferencesData} from '../../../Constants/commonConstants';
import {COLORS} from '../../../Constants';
import {CustomButton, HeadingText} from '../../Atoms';

const ChangeUserPreferences: React.FC<ChangeUserPreferencesProps> = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingTop: 8,
      }}>
      <HeadingText text="Change Preferences" />
      {preferencesData.map((val, index) => {
        return <PreferenceItem item={val} key={index} />;
      })}
      <View style={{flex: 3}}>
        <CustomButton title="Change" parentStyle={{marginTop: 80}} />
      </View>
    </View>
  );
};

export default ChangeUserPreferences;

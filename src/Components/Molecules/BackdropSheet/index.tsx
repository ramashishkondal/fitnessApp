import React from 'react';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import {Pressable} from 'react-native';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';

const BackDropSheet = () => {
  const sheet = useBottomSheetModal();
  return (
    <Pressable
      style={styles.parent}
      onPress={() => {
        sheet.dismissAll();
      }}>
      <LinearGradient
        colors={['#F4F6FA20', '#E1DDF560', '#7265E390']}
        style={styles.gradient}
      />
    </Pressable>
  );
};

export default BackDropSheet;

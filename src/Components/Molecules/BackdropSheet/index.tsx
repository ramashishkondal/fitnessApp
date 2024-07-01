import React from 'react';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import {Pressable} from 'react-native';
import {styles} from './styles';

const BackDropSheet = () => {
  const sheet = useBottomSheetModal();
  return (
    <Pressable
      style={styles.parent}
      onPress={() => {
        sheet.dismissAll();
      }}
    />
  );
};

export default BackDropSheet;

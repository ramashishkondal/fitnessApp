// libs
import React from 'react';
import {Text, View} from 'react-native';

// custom
import {DataInfoCompareProps} from './types';
import {styles} from './styles';

const DataInfoCompare = ({
  total,
  doneItems,
  totalSuffix,
  doneItemsSuffix,
  totalInfoName,
  doneItemsInfoName,
  parentStyle,
}: DataInfoCompareProps) => {
  return (
    <View style={[styles.parent, parentStyle]}>
      <View style={styles.leftCtr}>
        <View style={styles.textCtrLeft}>
          <Text style={styles.mainInfoText}>
            {doneItems} {doneItemsSuffix}
          </Text>
          <Text style={styles.descriptionText}>{doneItemsInfoName}</Text>
        </View>
      </View>
      <View style={styles.rightCtr}>
        <View style={styles.textCtrRight}>
          <Text style={styles.mainInfoText}>
            {total} {totalSuffix}
          </Text>
          <Text style={styles.descriptionText}>{totalInfoName}</Text>
        </View>
      </View>
    </View>
  );
};

export default DataInfoCompare;

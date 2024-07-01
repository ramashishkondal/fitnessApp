import {StyleProp, ViewStyle} from 'react-native';

export type DataInfoCompareProps = {
  total: number;
  totalSuffix?: string;
  totalInfoName?: string;
  doneItems: number;
  doneItemsSuffix?: string;
  doneItemsInfoName?: string;
  parentStyle?: StyleProp<ViewStyle>;
};

import {ImageProps} from 'react-native';

export type CustomHomeDetailsCardProps = {
  title: string;
  handleOnPress: () => void;
  status: string;
  source: ImageProps['source'];
  markerPercentage: number;
};

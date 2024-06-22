import {StyleProp, TextStyle} from 'react-native';

export type HeadingTextProps = {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  headingTextStyle?: 1 | 2;
};

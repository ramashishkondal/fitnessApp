import {StyleProp, ViewStyle} from 'react-native';

export type CommentProps = {
  comment: {
    userId: string;
    commentCreatedOnInMillis: number;
    comment: string;
  };
  parentStyle?: StyleProp<ViewStyle>;
};

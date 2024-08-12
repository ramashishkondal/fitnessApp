import {ViewStyle} from 'react-native';
import {AvatarData} from '../SelectAvatars/types';

export type AvatarProps = {
  item: AvatarData;
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
  setPhoto: React.Dispatch<React.SetStateAction<string>>;
  avatarParentStyle?: ViewStyle;
};

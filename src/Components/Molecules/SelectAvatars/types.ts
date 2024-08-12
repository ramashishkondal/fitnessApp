import {ImageProps, ViewStyle} from 'react-native';

export type SelectAvatarsProps = {
  avatar: string;
  setSelectedAvatar: React.Dispatch<React.SetStateAction<string>>;
  setPhoto: React.Dispatch<React.SetStateAction<string>>;
  avatarParentStyle?: ViewStyle;
};
export type AvatarData = {
  image: ImageProps['source'];
  name: string;
};

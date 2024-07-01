import {ImageProps} from 'react-native';

export type SelectAvatarsProps = {
  avatar: string;
  setSelectedAvatar: React.Dispatch<React.SetStateAction<string>>;
  setPhoto: React.Dispatch<React.SetStateAction<string>>;
};
export type AvatarData = {
  image: ImageProps['source'];
  name: string;
};

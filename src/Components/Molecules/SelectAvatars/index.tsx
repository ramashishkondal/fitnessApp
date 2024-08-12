// libs
import React from 'react';
import {FlatList, ListRenderItem} from 'react-native';

// custom
import Avatar from '../Avatar';
import {styles} from './styles';
import {AvatarData, SelectAvatarsProps} from './types';
import {IMAGES} from '../../../Constants';

const AvatarArray: Array<AvatarData> = Object.entries(IMAGES.AVATARS).map(
  ([key, value]) => ({
    name: key,
    image: value,
  }),
);

const SelectAvatars: React.FC<SelectAvatarsProps> = ({
  avatar,
  setPhoto,
  setSelectedAvatar,
  avatarParentStyle,
}) => {
  const renderItem: ListRenderItem<AvatarData> = ({item}) => (
    <Avatar
      item={item}
      selectedItem={avatar}
      setSelectedItem={setSelectedAvatar}
      setPhoto={setPhoto}
      avatarParentStyle={avatarParentStyle}
    />
  );
  return (
    <FlatList
      data={AvatarArray}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.flatListSyle}
      contentContainerStyle={styles.flatListCtr}
    />
  );
};

export default SelectAvatars;

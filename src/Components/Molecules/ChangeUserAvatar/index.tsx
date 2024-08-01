import React, {useState} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import SelectAvatars from '../SelectAvatars';
import {CustomButton, HeadingText} from '../../Atoms';
import firestore from '@react-native-firebase/firestore';

// 3rd party
import storage from '@react-native-firebase/storage';
import {useAppSelector} from '../../../Redux/Store';
import {firebaseDB} from '../../../Utils/userUtils';
import {ChangeUserAvatarProps} from './types';

const ChangeUserAvatar = ({setModalFalse, delayed}: ChangeUserAvatarProps) => {
  const [avatar, setAvatar] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  console.log('awdaw', avatar);

  const {id} = useAppSelector(state => state.User.data);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const url = await storage()
        .ref('media/Avatars/' + avatar + '.jpg')
        .getDownloadURL();
      if (
        delayed?.isDelayed &&
        delayed.delayedSetter &&
        delayed.delayedValues
      ) {
        delayed.delayedSetter({
          ...delayed.delayedValues,
          photo: url,
        });
        setIsLoading(false);
        setModalFalse();
        return;
      }
      await firestore()
        .collection(firebaseDB.collections.users)
        .doc(id!)
        .update({
          photo: url,
        });
    } catch (e) {
      console.log('error changing use avatar', e);
    }
    setModalFalse();
    setIsLoading(false);
  };
  return (
    <View style={styles.parent}>
      <HeadingText text="Change User Avatar" textStyle={{marginTop: 16}} />
      <SelectAvatars
        avatar={avatar}
        setSelectedAvatar={setAvatar}
        setPhoto={() => {}}
      />
      <CustomButton
        title="Change"
        parentStyle={{marginBottom: 240}}
        onPress={handleSubmit}
        isLoading={isLoading}
      />
    </View>
  );
};

export default ChangeUserAvatar;

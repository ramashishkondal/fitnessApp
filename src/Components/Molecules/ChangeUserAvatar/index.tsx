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
import {useNetInfo} from '@react-native-community/netinfo';
// import Toast from 'react-native-toast-message';
// import {FONT_FAMILY, SIZES} from '../../../Constants/commonStyles';

const ChangeUserAvatar = ({setModalFalse, delayed}: ChangeUserAvatarProps) => {
  const [avatar, setAvatar] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const netInfo = useNetInfo();

  const {id} = useAppSelector(state => state.User.data);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!netInfo.isConnected) {
      setIsLoading(false);
      setModalFalse();
      // Toast.show({
      //   type: 'info',
      //   text1: 'Avatar Update Pending',
      //   position: 'top',
      //   text2: "Your avatar will be updated once you're online.",
      //   text1Style: {fontFamily: FONT_FAMILY.REGULAR, fontSize: SIZES.font13},
      //   text2Style: {fontFamily: FONT_FAMILY.REGULAR, fontSize: SIZES.font10},
      //   swipeable: true,
      // });
    }
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
      <View style={{marginLeft: -22, maxHeight: 350}}>
        <SelectAvatars
          avatar={avatar}
          setSelectedAvatar={setAvatar}
          setPhoto={() => {}}
        />
      </View>
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

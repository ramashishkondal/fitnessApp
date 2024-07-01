//libs
import React, {useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';

// custom
import {
  CustomButton,
  SelectAvatars,
  SelectCustomPhoto,
  DescriptionText,
  HeadingText,
} from '../../../Components';
import {ICONS, STRING} from '../../../Constants';
import {AddProfilePictureProps} from '../../../Defs';
import {useAppDispatch} from '../../../Redux/Store';
import {updateUserData} from '../../../Redux/Reducers/currentUser';
import {styles} from './styles';

const AddProfilePicture: React.FC<AddProfilePictureProps> = ({navigation}) => {
  // state use
  const [modalVisible, setModalVisible] = useState(false);
  const [avatar, setAvatar] = useState<string>('');
  const [photo, setPhoto] = useState<string>('');
  const [isAvatar, setIsAvatar] = useState<boolean>(true);

  // redux use
  const dispatch = useAppDispatch();

  // functions
  const openModal = () => setModalVisible(true);
  const handleSubmit = () => {
    if (photo !== '') {
      console.log('photo is ', photo);
      dispatch(updateUserData({photo}));
      navigation.push('AddPreferences');
    } else {
      Alert.alert('You have to select a photo', 'Select one of the avatars');
    }
  };

  return (
    <View style={styles.parent}>
      <View style={styles.avatarCtr}>
        {isAvatar === false ? (
          <View style={styles.photoCtr}>
            <Image source={{uri: photo}} style={styles.photo} />
            <TouchableOpacity
              style={styles.closeCtr}
              onPress={() => setIsAvatar(true)}>
              <View style={styles.closeIconCtr}>
                {ICONS.Close({height: 20, width: 20})}
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <SelectAvatars
            avatar={avatar}
            setSelectedAvatar={setAvatar}
            setPhoto={setPhoto}
          />
        )}
      </View>
      <View style={styles.childCtr}>
        <HeadingText text={STRING.ADD_PROFILE_PICTURE.TITLE} />
        <DescriptionText
          text={STRING.ADD_PROFILE_PICTURE.TITLE_DESCRIPTION}
          textStyle={styles.titleDescriptionText}
        />
        <TouchableOpacity onPress={openModal}>
          <Text style={styles.addPhotoText}>
            {STRING.ADD_PROFILE_PICTURE.ADD_PHOTO_BUTTON}
          </Text>
        </TouchableOpacity>
        <CustomButton
          title={STRING.ADD_PROFILE_PICTURE.BUTTON_TEXT}
          parentStyle={styles.buttonParentStyle}
          onPress={handleSubmit}
        />
      </View>
      <SelectCustomPhoto
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setPhoto={setPhoto}
        onSuccess={() => {
          setIsAvatar(false);
        }}
      />
    </View>
  );
};

export default AddProfilePicture;

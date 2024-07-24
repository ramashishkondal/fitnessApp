//libs
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

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
import FastImage from 'react-native-fast-image';
import ToastError from '../../../Components/Atoms/ToastError';
import Toast from 'react-native-toast-message';

const AddProfilePicture: React.FC<AddProfilePictureProps> = ({navigation}) => {
  // state use
  const [modalVisible, setModalVisible] = useState(false);
  const [avatar, setAvatar] = useState<string>('');
  const [photo, setPhoto] = useState<string>('');
  const [isAvatar, setIsAvatar] = useState<boolean>(true);
  const [showFullScreen, setShowFullScreen] = useState<boolean>(false);

  // redux use
  const dispatch = useAppDispatch();

  // functions
  const openModal = () => {
    Toast.hide();
    setModalVisible(true);
  };
  const handleSubmit = () => {
    if (photo !== '') {
      console.log('photo is ', photo);
      dispatch(updateUserData({photo}));
      navigation.push('AddPreferences');
    } else {
      ToastError('No Profile picture selected', 'Select one of the avatars');
    }
  };

  return (
    <View style={styles.parent}>
      <View style={styles.avatarCtr}>
        {isAvatar === false ? (
          <View style={styles.photoCtr}>
            <TouchableOpacity
              style={styles.openFullScreenCtr}
              onPress={() => setShowFullScreen(true)}
            />
            <Image source={{uri: photo}} style={styles.photo} />
            <TouchableOpacity
              style={styles.closeCtr}
              onPress={() => {
                setIsAvatar(true);
                setPhoto('');
                setAvatar('');
              }}>
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
      {showFullScreen ? (
        <TouchableOpacity
          onPress={() => setShowFullScreen(false)}
          style={styles.fullScreenPhotoCtr}>
          <FastImage
            source={{uri: photo}}
            style={styles.fullScreenImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : null}
      <View style={styles.childCtr}>
        <HeadingText text={STRING.ADD_PROFILE_PICTURE.TITLE} />
        <DescriptionText
          text={
            isAvatar
              ? STRING.ADD_PROFILE_PICTURE.TITLE_DESCRIPTION
              : STRING.ADD_PROFILE_PICTURE.TITLE_DESCRIPTION_2
          }
          textStyle={styles.titleDescriptionText}
        />
        <TouchableOpacity onPress={openModal}>
          <Text style={styles.addPhotoText}>
            {isAvatar
              ? STRING.ADD_PROFILE_PICTURE.ADD_PHOTO_BUTTON
              : 'Change Custom Photo'}
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

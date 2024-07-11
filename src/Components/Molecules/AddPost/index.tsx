// libs
import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  Pressable,
  Alert,
} from 'react-native';

import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import EmojiSelector from 'react-native-emoji-selector';

// custom
import CustomButton from '../../Atoms/CustomButton';
import {COLORS, ICONS, SIZES, STRING} from '../../../Constants';
import {storePost} from '../../../Utils/userUtils';
import {useAppSelector} from '../../../Redux/Store';
import {AddPostProps} from './types';
import {styles} from './styles';
import {CustomImage, HeadingText} from '../../Atoms';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Timestamp} from '@react-native-firebase/firestore';
import {useNetInfo} from '@react-native-community/netinfo';
import {useRealm} from '@realm/react';
import {PostDb} from '../../../DbModels/post';

const AddPost: React.FC<AddPostProps> = ({setModalFalse}) => {
  // constants
  const options: CameraOptions = {
    mediaType: 'photo',
  };
  // state use
  const [photo, setPhoto] = useState('');
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmojiShown, setIsEmojiShown] = useState(false);

  // net info use
  const netInfo = useNetInfo();

  // realm use
  const realm = useRealm();

  // redux use
  const {
    id: userId,
    photo: userPhoto,
    firstName,
    lastName,
  } = useAppSelector(state => state.User.data);

  // functions
  const openCamera = async () => {
    try {
      const result: ImagePickerResponse = await launchCamera(options);
      if (result.assets !== undefined) {
        setPhoto(result?.assets[0]?.uri ?? '');
      }
    } catch (e) {
      console.log('error uploading photo from camera - ', e);
    }
  };
  const openGallery = async () => {
    try {
      const result: ImagePickerResponse = await launchImageLibrary(options);
      if (result.assets !== undefined) {
        setPhoto(result?.assets[0]?.uri ?? '');
      }
    } catch (e) {
      console.log('error uploading photo from library - ', e);
    }
  };

  const storeDataInRealmDb = (postPhoto: string, postCaption: string) => {
    realm.write(() => {
      realm.create(PostDb, {
        caption: postCaption,
        photo: postPhoto,
      });
    });
  };

  const handlePost = async () => {
    if (photo === '') {
      Alert.alert('Error', 'You have to select an image to post');
      return;
    }
    try {
      if (netInfo.isConnected === true) {
        if (userId !== null && userPhoto !== null) {
          setIsLoading(true);

          await storePost({
            caption,
            userId,
            createdOn: Timestamp.fromDate(new Date()),
            photo,
            comments: [],
            likedByUsersId: [],
            userName: firstName && lastName ? firstName + ' ' + lastName : '',
            userPhoto,
          });
          setModalFalse();
        }
      } else {
        storeDataInRealmDb(photo, caption);
        setModalFalse();
      }
    } catch (e) {
      console.log('error', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Pressable style={{flex: 1}} onPress={() => setIsEmojiShown(false)}>
        <KeyboardAwareScrollView
          style={styles.parent}
          // extraHeight={60}
          extraScrollHeight={Platform.OS === 'ios' ? 160 : -100}
          enableOnAndroid={true}>
          <View>
            <HeadingText
              text={STRING.ADD_POST.TITLE}
              textStyle={styles.titleText}
            />
            <View style={styles.addPostCtr}>
              <CustomImage
                source={{uri: userPhoto}}
                parentStyle={styles.customImageParent}
                imageStyle={styles.customImage}
              />
              <View style={styles.textInputCtr}>
                <TextInput
                  value={caption}
                  maxLength={100}
                  onChangeText={setCaption}
                  placeholder="Add a Caption"
                  style={styles.textInput}
                  multiline
                  placeholderTextColor={COLORS.PRIMARY.DARK_GREY}
                  onPress={() => setIsEmojiShown(false)}
                />
              </View>
            </View>
            {photo ? (
              <Image source={{uri: photo}} style={styles.image} />
            ) : null}
          </View>
        </KeyboardAwareScrollView>
      </Pressable>
      {isEmojiShown ? (
        <View style={styles.EmojiSelectorCtr}>
          <EmojiSelector
            onEmojiSelected={emoji => {
              setCaption(caption + emoji);
            }}
            showTabs={false}
            showSectionTitles
            columns={8}
            theme={COLORS.SECONDARY.GREY}
          />
        </View>
      ) : null}
      <View style={styles.footerCtr}>
        <View style={styles.childFooterCtr}>
          <TouchableOpacity onPress={openCamera} style={styles.iconsCtr}>
            {ICONS.Camera({
              width: 24,
              height: 24,
              color: COLORS.SECONDARY.GREY,
            })}
          </TouchableOpacity>
          <TouchableOpacity onPress={openGallery} style={styles.iconsCtr}>
            {ICONS.Gallery({
              width: 24,
              height: 24,
              color: COLORS.SECONDARY.GREY,
            })}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsEmojiShown(state => !state);
            }}
            style={styles.iconsCtr}>
            {ICONS.SmileyGood({
              width: 24,
              height: 24,
              color: COLORS.SECONDARY.GREY,
            })}
          </TouchableOpacity>
        </View>
        <CustomButton
          title="Post"
          parentStyle={styles.buttonParentStyle}
          textStyle={{fontSize: SIZES.font13}}
          onPress={handlePost}
          isLoading={isLoading}
        />
      </View>
    </>
  );
};

export default AddPost;

import React, {useCallback, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {EditProfileProps} from './types';
import {styles} from './styles';
import {useAppSelector} from '../../../Redux/Store';
import {CustomImage, SelectCustomPhoto, WithModal} from '../../../Components';
import {COLORS, ICONS} from '../../../Constants';
import ChangeUserInfo from '../../../Components/Molecules/ChangeUserInfo';
import ChangeUserPreferences from '../../../Components/Molecules/ChangeUserPreferences';
import ChangeUserInterests from '../../../Components/Molecules/ChangeUserInterests';
import firestore from '@react-native-firebase/firestore';
import {firebaseDB} from '../../../Utils/userUtils';
import storage from '@react-native-firebase/storage';

const EditProfile: React.FC<EditProfileProps> = () => {
  // state use
  const [activeModal, setActiveModal] = useState<
    'userInfo' | 'preferences' | null | 'interests'
  >(null);

  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  // redux use
  const {
    photo,
    firstName,
    lastName,
    email,
    interests,
    preferences,
    gender,
    id,
  } = useAppSelector(state => state.User.data);

  // functions
  const setModalFalse = () => setActiveModal(null);
  const getActiveModalComp = useCallback(() => {
    if (activeModal === 'userInfo') {
      return <ChangeUserInfo setModalFalse={setModalFalse} />;
    } else if (activeModal === 'preferences') {
      return <ChangeUserPreferences setModalFalse={setModalFalse} />;
    } else if (activeModal === 'interests') {
      return <ChangeUserInterests setModalFalse={setModalFalse} />;
    } else {
      return null;
    }
  }, [activeModal]);
  const ActiveModalComponent = getActiveModalComp();

  return (
    <View style={styles.parent}>
      <Text style={styles.cardsHeadingText}>User Info</Text>
      <View style={styles.userInfoCtr}>
        <View style={styles.userPhotoCtr}>
          <CustomImage
            source={{uri: photo}}
            parentStyle={styles.userPhotoParent}
            imageStyle={styles.userPhoto}
          />
          <TouchableOpacity
            style={styles.pencilPhotoCtr}
            onPress={() => setPhotoModalVisible(true)}>
            <View style={styles.pencilBackCtr}>
              {ICONS.Pencil({width: 10, height: 10, color: 'white'})}
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 2, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={styles.infoTextHeading}>Name :</Text>
            <Text style={styles.infoTextHeading}>Email :</Text>
            {gender ? (
              <Text style={styles.infoTextHeading}>Gender :</Text>
            ) : null}
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.infoText}>
              {`${firstName} ${lastName ?? ''}`}
            </Text>
            <Text style={styles.infoText}>{`${email.slice(0, 14)}${
              email.length > 14 ? '...' : ''
            }`}</Text>
            {gender ? <Text style={styles.infoText}>{gender}</Text> : null}
          </View>
        </View>
        <TouchableOpacity
          style={styles.pencilCtr}
          onPress={() => setActiveModal('userInfo')}>
          <View style={styles.pencilBackCtr}>
            {ICONS.Pencil({width: 10, height: 10, color: 'white'})}
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 5}}>
        <Text style={styles.cardsHeadingText}>Preferences</Text>
        <View style={styles.cardCtr}>
          {preferences.some(val => val.selected) ? (
            preferences
              .filter(val => val.selected === true)
              .map((val, index) => (
                <Text key={index} style={styles.infoText}>
                  {val.title}
                </Text>
              ))
          ) : (
            <Text style={styles.infoText}>No Preferences selected</Text>
          )}
          <TouchableOpacity
            style={styles.pencilCtr}
            onPress={() => setActiveModal('preferences')}>
            <View style={styles.pencilBackCtr}>
              {ICONS.Pencil({width: 10, height: 10, color: 'white'})}
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.cardsHeadingText}>Interests</Text>
        <View style={styles.cardCtr}>
          {interests.some(val => val.selected) ? (
            interests.map((val, index) => {
              if (val.selected) {
                return (
                  <Text key={index} style={styles.infoText}>
                    {val.title}
                  </Text>
                );
              }
            })
          ) : (
            <Text style={styles.infoText}>No Interests selected</Text>
          )}
          <TouchableOpacity
            style={styles.pencilCtr}
            onPress={() => setActiveModal('interests')}>
            <View style={styles.pencilBackCtr}>
              {ICONS.Pencil({width: 10, height: 10, color: 'white'})}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <WithModal
        modalVisible={activeModal !== null}
        setModalFalse={() => setActiveModal(null)}
        parentStyle={{backgroundColor: COLORS.PRIMARY.LIGHT_GREY}}>
        {ActiveModalComponent}
      </WithModal>
      <SelectCustomPhoto
        setPhoto={() => {}}
        modalVisible={photoModalVisible}
        setModalVisible={setPhotoModalVisible}
        onSuccess={(uri: string) => {
          (async () => {
            console.log('ee');
            try {
              const reference = storage().ref(
                'media/' + 'profilePictures' + id + '/' + 'photo',
              );
              await reference.putFile(uri);
              const url = await reference.getDownloadURL();
              await firestore()
                .collection(firebaseDB.collections.users)
                .doc(id!)
                .update({photo: url});
              setPhotoModalVisible(false);
              console.log('zezu');
            } catch (e) {
              console.log(e);
            }
          })();
        }}
      />
    </View>
  );
};

export default EditProfile;

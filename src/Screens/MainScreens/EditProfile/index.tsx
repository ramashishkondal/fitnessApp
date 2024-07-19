import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {CustomImage, SelectCustomPhoto, WithModal} from '../../../Components';
import {ICONS} from '../../../Constants';
import ChangeUserInfo from '../../../Components/Molecules/ChangeUserInfo';
import ChangeUserPreferences from '../../../Components/Molecules/ChangeUserPreferences';
import ChangeUserInterests from '../../../Components/Molecules/ChangeUserInterests';
import firestore from '@react-native-firebase/firestore';
import {firebaseDB} from '../../../Utils/userUtils';
import storage from '@react-native-firebase/storage';
import {useNetInfo} from '@react-native-community/netinfo';
import {useRealm} from '@realm/react';
import {UserDb} from '../../../DbModels/user';
import {UpdateMode} from 'realm';
import {updateUserData} from '../../../Redux/Reducers/currentUser';
import CustomCardUserItems from '../../../Components/Molecules/CustomCardUserItems';
import {EditProfileProps} from '../../../Defs/navigators';

const EditProfile: React.FC<EditProfileProps> = ({navigation, route}) => {
  // state use
  const [activeModal, setActiveModal] = useState<
    'userInfo' | 'preferences' | null | 'interests'
  >(null);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  console.log('got from params', route.params.from === 'Home');
  const [isEditable, setIsEditable] = useState(false);

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
  const dispatch = useAppDispatch();

  // netInfo use
  const netInfo = useNetInfo();

  // realm use
  const realm = useRealm();

  // effect use
  useEffect(() => {
    navigation.setOptions({
      headerRight:
        route.params.from === 'Home'
          ? () => (
              <TouchableOpacity
                style={styles.editCtr}
                onPress={() => setIsEditable(!isEditable)}>
                <Text style={styles.editText}>
                  {isEditable ? 'Done' : 'Edit'}
                </Text>
              </TouchableOpacity>
            )
          : undefined,
    });
  }, [isEditable, navigation, route.params.from]);

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
  const handleWithModalFalse = useCallback(
    (): void => setActiveModal(null),
    [],
  );

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
          {isEditable || route.params.from === 'Settings' ? (
            <TouchableOpacity
              style={styles.pencilPhotoCtr}
              onPress={() => setPhotoModalVisible(true)}>
              <View style={styles.pencilBackPhotoCtr}>
                {ICONS.Pencil({width: 10, height: 10, color: 'white'})}
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.genderCtr}>
          <View style={styles.nameAndGenderCtr}>
            <Text style={styles.infoTextHeading}>Name :</Text>
            <Text style={styles.infoTextHeading}>Email :</Text>
            {gender ? (
              <Text style={styles.infoTextHeading}>Gender :</Text>
            ) : null}
          </View>
          <View style={styles.firstNameAndLastNameCtr}>
            <Text style={styles.infoText}>
              {`${firstName.slice(0, 8)}${
                firstName.length > 8 ? '...' : ''
              } ${lastName.slice(0, 8)}${lastName.length > 8 ? '...' : ''}`}
            </Text>
            <Text style={styles.infoText}>{`${email.slice(0, 14)}${
              email.length > 14 ? '...' : ''
            }`}</Text>
            {gender ? <Text style={styles.infoText}>{gender}</Text> : null}
          </View>
        </View>
      </View>
      {isEditable || route.params.from === 'Settings' ? (
        <TouchableOpacity
          style={styles.pencilCtr}
          onPress={() => setActiveModal('userInfo')}>
          <View style={styles.pencilBackCtr}>
            {ICONS.Pencil({width: 10, height: 10, color: 'white'})}
          </View>
        </TouchableOpacity>
      ) : null}
      <View style={styles.otherCtr}>
        <Text style={styles.cardsHeadingText}>Preferences</Text>
        <View style={styles.cardCtr}>
          {preferences.some(val => val.selected) ? (
            preferences
              .filter(val => val.selected === true)
              .map((val, index) => (
                <CustomCardUserItems text={val.title} key={index} />
              ))
          ) : (
            <Text style={styles.infoText}>No Preferences selected</Text>
          )}
        </View>
        {isEditable || route.params.from === 'Settings' ? (
          <TouchableOpacity
            style={styles.pencilCtr}
            onPress={() => setActiveModal('preferences')}>
            <View style={styles.pencilBackCtr}>
              {ICONS.Pencil({width: 10, height: 10, color: 'white'})}
            </View>
          </TouchableOpacity>
        ) : null}
        <View>
          <Text style={styles.cardsHeadingText}>Interests</Text>
          <View style={styles.cardCtr}>
            {interests.some(val => val.selected) ? (
              interests.map((val, index) => {
                if (val.selected) {
                  return <CustomCardUserItems text={val.title} key={index} />;
                }
              })
            ) : (
              <Text style={styles.infoText}>No Interests selected</Text>
            )}
          </View>
          {isEditable || route.params.from === 'Settings' ? (
            <TouchableOpacity
              style={styles.pencilCtr}
              onPress={() => setActiveModal('interests')}>
              <View style={styles.pencilBackCtr}>
                {ICONS.Pencil({width: 10, height: 10, color: 'white'})}
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <WithModal
        modalVisible={activeModal !== null}
        setModalFalse={handleWithModalFalse}
        parentStyle={styles.withModalParent}>
        {ActiveModalComponent}
      </WithModal>
      <SelectCustomPhoto
        setPhoto={undefined}
        modalVisible={photoModalVisible}
        setModalVisible={setPhotoModalVisible}
        onSuccess={(uri: string) => {
          (async () => {
            if (!netInfo.isConnected) {
              if (id) {
                realm.write(() => {
                  realm.create(
                    UserDb,
                    {
                      photo: uri,
                      firstName,
                      lastName,
                      interests,
                      preferences,
                      gender,
                      id,
                    },
                    UpdateMode.Modified,
                  );
                });
              }
              dispatch(updateUserData({photo: uri}));
            } else {
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
              } catch (e) {
                console.log(e);
              }
            }
            setPhotoModalVisible(false);
          })();
        }}
      />
    </View>
  );
};

export default EditProfile;

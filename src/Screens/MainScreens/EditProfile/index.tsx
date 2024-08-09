import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './styles';
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {CustomImage, SelectCustomPhoto, WithModal} from '../../../Components';
import {ICONS, IMAGES} from '../../../Constants';
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
import ChangeUserAvatar from '../../../Components/Molecules/ChangeUserAvatar';
import {isValidURL} from '../../../Utils/commonUtils';

const EditProfile: React.FC<EditProfileProps> = ({navigation, route}) => {
  // state use
  const [activeModal, setActiveModal] = useState<
    'userInfo' | 'preferences' | null | 'interests' | 'avatar'
  >(null);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
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
  const [delayedValues, setDelayedValues] = useState(
    route.params.from === 'Home'
      ? {photo, firstName, lastName, email, interests, preferences, gender, id}
      : null,
  );
  console.log('photo is ', photo);
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
                onPress={() => {
                  setPhotoModalVisible(false);

                  setIsEditable(!isEditable);
                  if (isEditable) {
                    if (netInfo.isConnected) {
                      console.log('logging', isValidURL(delayedValues?.photo!));

                      if (
                        !delayedValues?.photo ||
                        isValidURL(delayedValues?.photo)
                      ) {
                        firestore()
                          .collection(firebaseDB.collections.users)
                          .doc(id!)
                          .update({
                            ...delayedValues,
                          });
                      } else {
                        (async () => {
                          try {
                            const reference = storage().ref(
                              'media/' + 'profilePictures' + id + '/' + 'photo',
                            );
                            await reference.putFile(delayedValues.photo);
                            const url = await reference.getDownloadURL();
                            await firestore()
                              .collection(firebaseDB.collections.users)
                              .doc(id!)
                              .update({...delayedValues, photo: url});
                          } catch (e) {
                            console.log(e);
                          }
                        })();
                      }
                    } else {
                      realm.write(() => {
                        realm.create(
                          UserDb,
                          {
                            id: id!,
                            preferences: delayedValues?.preferences.map(
                              val => val,
                            ),
                            firstName: delayedValues?.firstName,
                            lastName: delayedValues?.lastName,
                            interests: delayedValues?.interests.map(val => val),
                            gender: delayedValues?.gender,
                            photo:
                              delayedValues?.photo === photo
                                ? undefined
                                : delayedValues?.photo,
                          },
                          UpdateMode.Modified,
                        );
                      });
                      dispatch(updateUserData(delayedValues!));
                    }
                  }
                }}>
                <Text style={styles.editText}>
                  {isEditable ? 'Done' : 'Edit'}
                </Text>
              </TouchableOpacity>
            )
          : undefined,
    });
  }, [
    delayedValues,
    dispatch,
    firstName,
    gender,
    id,
    interests,
    isEditable,
    lastName,
    navigation,
    netInfo.isConnected,
    photo,
    realm,
    route.params.from,
  ]);

  // functions
  const setModalFalse = () => setActiveModal(null);
  const getActiveModalComp = useCallback(() => {
    if (activeModal === 'userInfo') {
      return (
        <ChangeUserInfo
          setModalFalse={setModalFalse}
          delayed={{
            isDelayed: route.params.from === 'Home',
            delayedSetter: setDelayedValues,
            delayedValues: delayedValues,
          }}
        />
      );
    } else if (activeModal === 'preferences') {
      return (
        <ChangeUserPreferences
          setModalFalse={setModalFalse}
          delayed={{
            isDelayed: route.params.from === 'Home',
            delayedSetter: setDelayedValues,
            delayedValues: delayedValues,
          }}
        />
      );
    } else if (activeModal === 'interests') {
      return (
        <ChangeUserInterests
          setModalFalse={setModalFalse}
          delayed={{
            isDelayed: route.params.from === 'Home',
            delayedSetter: setDelayedValues,
            delayedValues: delayedValues,
          }}
        />
      );
    } else if (activeModal === 'avatar') {
      return (
        <ChangeUserAvatar
          setModalFalse={setModalFalse}
          delayed={{
            isDelayed: route.params.from === 'Home',
            delayedSetter: setDelayedValues,
            delayedValues: delayedValues,
          }}
        />
      );
    } else {
      return null;
    }
  }, [activeModal, delayedValues, route.params.from]);
  const ActiveModalComponent = getActiveModalComp();
  const handleWithModalFalse = useCallback(
    (): void => setActiveModal(null),
    [],
  );

  const userData = useMemo(() => {
    if (route.params.from === 'Home') {
      return delayedValues;
    }
    return {
      photo,
      firstName,
      lastName,
      email,
      interests,
      preferences,
      gender,
      id,
    };
  }, [
    delayedValues,
    email,
    firstName,
    gender,
    id,
    interests,
    lastName,
    photo,
    preferences,
    route.params.from,
  ]);
  return (
    <>
      <ScrollView style={styles.parent}>
        <Text style={styles.cardsHeadingText}>User Info</Text>
        <View style={styles.userInfoCtr}>
          <View style={styles.userPhotoCtr}>
            <CustomImage
              source={
                userData?.photo ? {uri: userData?.photo} : IMAGES.DEFAULT_USER
              }
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
          <View style={styles.nameAndGenderCtr}>
            <View style={styles.textCtr}>
              <Text style={styles.infoTextHeading}>Name : </Text>
              <Text style={styles.infoText} numberOfLines={1}>
                {userData?.firstName + ' ' + userData?.lastName}
              </Text>
            </View>
            <View style={styles.textCtr}>
              <Text style={styles.infoTextHeading}>Email : </Text>
              <Text style={styles.infoText}>{email}</Text>
            </View>

            {userData?.gender ? (
              <Text style={styles.infoTextHeading}>
                Gender :{' '}
                <Text style={styles.infoText}>{`${userData?.gender
                  .charAt(0)
                  .toUpperCase()}${userData?.gender.slice(1)}`}</Text>{' '}
              </Text>
            ) : null}
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
            {userData?.preferences.some(val => val.selected) ? (
              userData?.preferences
                .filter(val => val.selected === true)
                .map((val, index) => (
                  <CustomCardUserItems text={val.title} key={index} />
                ))
            ) : (
              <Text style={styles.infoTextOther}>No Preferences selected</Text>
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
              {userData?.interests.some(val => val.selected) ? (
                userData?.interests.map((val, index) => {
                  if (val.selected) {
                    return <CustomCardUserItems text={val.title} key={index} />;
                  }
                })
              ) : (
                <Text style={styles.infoTextOther}>No Interests selected</Text>
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
          parentStyle={[
            styles.withModalParent,
            activeModal === 'avatar'
              ? {marginTop: 150, marginBottom: 158}
              : null,
          ]}>
          {ActiveModalComponent}
        </WithModal>
      </ScrollView>
      <SelectCustomPhoto
        setPhoto={undefined}
        modalVisible={photoModalVisible}
        setModalVisible={setPhotoModalVisible}
        onAvatar={() => {
          setActiveModal('avatar');
        }}
        onDelete={() => {
          if (route.params.from === 'Home' && delayedValues) {
            setDelayedValues({...delayedValues, photo: ''});
            setPhotoModalVisible(false);
            return;
          }
          if (!netInfo.isConnected) {
            if (id) {
              realm.write(() => {
                realm.create(
                  UserDb,
                  {
                    photo: '',
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
            dispatch(updateUserData({photo: ''}));
            setPhotoModalVisible(false);
          } else {
            try {
              firestore()
                .collection(firebaseDB.collections.users)
                .doc(id!)
                .update({photo: ''});
            } catch (e) {
              console.log(e);
            }
          }
          setPhotoModalVisible(false);
        }}
        onSuccess={(uri: string) => {
          (async () => {
            console.log('yayeet', route.params.from, delayedValues);

            if (route.params.from === 'Home' && delayedValues) {
              setDelayedValues({...delayedValues, photo: uri});
              setPhotoModalVisible(false);
              return;
            }
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
              setPhotoModalVisible(false);
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
    </>
  );
};

export default EditProfile;

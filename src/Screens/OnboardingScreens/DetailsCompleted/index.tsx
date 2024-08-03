// libs
import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';

// 3rd party
import storage from '@react-native-firebase/storage';

// custom
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {CustomLoading} from '../../../Components';
import {
  storeUserData,
  createUser,
  sendNotification,
} from '../../../Utils/userUtils';
import {COLORS, ICONS, IMAGES, STRING} from '../../../Constants';
import {styles} from './style';
import {updateSettingsCachedData} from '../../../Redux/Reducers/userSettings';
import {resetHealthData} from '../../../Redux/Reducers/health';
import {resetMealData} from '../../../Redux/Reducers/dailyMeal';
import {DetailsCompletedProps} from '../../../Defs';

const logoSize = {
  width: 40,
  height: 40,
};
const arrowSize = {
  width: 20,
  height: 20,
};
const DetailsCompleted: React.FC<DetailsCompletedProps> = ({navigation}) => {
  // state use
  const [isLoading, setIsLoading] = useState(false);

  // redux use
  const {
    data: {password, ...user},
  } = useAppSelector(state => state.User);
  const {isBiometricEnabled} = useAppSelector(
    state => state.settings.data.cachedData,
  );

  const dispatch = useAppDispatch();

  // functions
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (password !== null) {
        dispatch(
          updateSettingsCachedData({
            email: user.email,
            password,
            shouldAskBiometics: false,
            isSocial: false,
            isBiometricEnabled: isBiometricEnabled,
          }),
        );
        dispatch(resetMealData());
        const userCredentials = await createUser(user.email, password);
        dispatch(resetHealthData());

        let url = '';
        if (/avatar+/.test(user.photo)) {
          url = await storage()
            .ref('media/Avatars/' + user.photo + '.jpg')
            .getDownloadURL();
        } else {
          const reference = storage().ref(
            'media/profilePictures/' +
              userCredentials?.user.uid +
              '/' +
              'photo',
          );

          await reference.putFile(user.photo);
          url = await reference.getDownloadURL();
        }
        if (userCredentials !== undefined) {
          await storeUserData(
            {
              ...user,
              photo: url,
              id: userCredentials.user.uid,
              notifications: [],
              storiesWatched: [],
            },
            userCredentials.user.uid,
          );
          await sendNotification(
            {
              message: 'You have successfully registered on FitnessApp !',
              userId: 'App',
              isUnread: true,
              isShownViaPushNotification: false,
            },
            userCredentials.user.uid,
          );
        }
      }
    } catch (e) {
      console.log('error in creating user - ', e);
      Alert.alert('Error', 'something went wrong', [
        {
          text: 'Ok',
          onPress: () => {
            navigation.navigate('LandingPage');
          },
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={IMAGES.DETIALS_COMPLETED}
      style={styles.backgroundImage}>
      <View style={styles.parent}>
        <View style={styles.childCtr}>
          <View style={styles.logoCtr}>{ICONS.Logo(logoSize)}</View>
          <Text style={styles.titleText}>{STRING.DETAILS_COMPLETED.TITLE}</Text>
          <Text style={styles.titleDescriptionText}>
            {STRING.DETAILS_COMPLETED.TITLE_DESCRIPTION}
          </Text>
          <TouchableOpacity style={styles.arrowCtr} onPress={handleSubmit}>
            {isLoading ? (
              <CustomLoading color={COLORS.SECONDARY.WHITE} />
            ) : (
              ICONS.DoubleArrow({color: COLORS.SECONDARY.WHITE, ...arrowSize})
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default DetailsCompleted;

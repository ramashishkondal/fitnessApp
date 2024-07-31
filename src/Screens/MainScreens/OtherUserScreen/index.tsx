// libs
import React, {useEffect} from 'react';

// 3rd party
import firestore from '@react-native-firebase/firestore';

// custom
import {CustomImage} from '../../../Components';
import CustomCardUserItems from '../../../Components/Molecules/CustomCardUserItems';
import {ScrollView, Text, View} from 'react-native';
import {styles} from './styles';
import {firebaseDB} from '../../../Utils/userUtils';
import {OtherUserScreenProps} from '../../../Defs/navigators';

const OtherUserScreen: React.FC<OtherUserScreenProps> = ({
  route: {
    params: {userData},
  },
}) => {
  // effect use
  useEffect(() => {
    firestore().collection(firebaseDB.collections.users).doc();
  }, []);

  return (
    <ScrollView style={styles.parent}>
      <Text style={styles.cardsHeadingText}>User Info</Text>
      <View style={styles.userInfoCtr}>
        <View style={styles.userPhotoCtr}>
          <CustomImage
            source={{uri: userData.photo}}
            parentStyle={styles.userPhotoParent}
            imageStyle={styles.userPhoto}
          />
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
            <Text style={styles.infoText}>{userData.email}</Text>
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
        </View>
      </View>
    </ScrollView>
  );
};

export default OtherUserScreen;

import React from 'react';
import {Text, View} from 'react-native';
import {COLORS, SIZES} from '../../../Constants';
import {NotificationProps} from './types';
import {CustomImage, DescriptionText} from '../../Atoms';
import {FONT_FAMILY} from '../../../Constants/commonStyles';
import {RFValue} from 'react-native-responsive-fontsize';

const Notification: React.FC<NotificationProps> = ({
  userName,
  notificationText,
  timeAgo,
  isUnread,
  userPhoto,
}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.SECONDARY.WHITE,
        flexDirection: 'row',
        marginHorizontal: 24,
        borderBottomWidth: 1.25,
        borderColor: COLORS.SECONDARY.LIGHT_GREY_2,
        paddingVertical: 24,
      }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
        }}>
        <CustomImage
          source={{uri: userPhoto}}
          parentStyle={{
            flex: 1,
            maxHeight: 55,
            minWidth: 55,
            padding: 5,
            borderRadius: 200,
            // borderWidth: 1,
          }}
          imageStyle={{}}
        />
      </View>
      <View style={{flex: 6}}>
        <Text
          style={{
            fontFamily: FONT_FAMILY.MEDIUM,
            fontSize: RFValue(12),
            marginRight: 16,
          }}>
          <Text style={{fontWeight: 'bold'}}>{userName} </Text>
          {notificationText}
        </Text>
        <DescriptionText
          text={timeAgo}
          textStyle={{
            textAlign: 'left',
            marginVertical: 8,
            fontSize: SIZES.font11,
          }}
        />
      </View>
      <View style={{alignSelf: 'center'}}>
        {isUnread ? (
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: '#E1DDF5',
              borderRadius: 200,
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

export default Notification;

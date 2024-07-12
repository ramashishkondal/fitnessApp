import {StyleSheet, Platform} from 'react-native';
import {COLORS} from '../../../Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONT_FAMILY, SIZES} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    backgroundColor: COLORS.SECONDARY.WHITE,
    flexDirection: 'row',
    marginHorizontal: 24,
    borderBottomWidth: 1.25,
    borderColor: COLORS.SECONDARY.LIGHT_GREY_2,
    paddingVertical: 24,
  },
  CustomImageCtr: {
    flex: 1,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  customImageParentStyle: {
    flex: 1,
    maxHeight: 55,
    minWidth: 55,
    padding: 5,
    borderRadius: 200,
  },
  customImageStyle: {
    borderRadius: 200,
  },
  deleteCtr: {
    flexGrow: Platform.OS === 'android' ? 1 : undefined,
    backgroundColor: COLORS.SECONDARY.RED,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    width: 100,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  deleteText: {
    color: COLORS.SECONDARY.WHITE,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: SIZES.font14,
  },
  textCtr: {flex: 6},
  notificationText: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: RFValue(13.5),
    fontWeight: '600',
    marginRight: 16,
    color: 'black',
  },
  userNameText: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: RFValue(13.5),
  },
  descriptionText: {
    textAlign: 'left',
    marginVertical: 8,
    fontSize: SIZES.font11,
  },
  isUnreadCtr: {
    alignSelf: 'center',
  },
  isUnreadDot: {
    width: 10,
    height: 10,
    backgroundColor: '#E1DDF5',
    borderRadius: 200,
  },
});

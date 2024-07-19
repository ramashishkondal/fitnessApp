import {SIZES} from './../../../Constants/commonStyles';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';
import {RFValue} from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: '#1118',
    zIndex: -1,
  },
  parent: {
    flex: 1,
    // marginHorizontal: 16,
    marginTop: 40,
    marginBottom: 24,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  headingCtr: {
    marginTop: RFValue(24),
    marginBottom: SIZES.height / 24,
  },
  childCtrTop: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.PURPLE,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
  },
  closeCtr: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 8,
    right: 8,
    zIndex: 9,
  },
  userInfoCtr: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameText: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontWeight: '400',
    marginLeft: 8,
    fontSize: RFValue(11.7),
    color: 'black',
  },
  customImageParent: {
    width: 42,
    height: 42,
  },
  customImage: {
    borderRadius: 100,
  },
  childCtrBottom: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  cardCtr: {
    position: 'absolute',
    alignSelf: 'center',
    // justifyContent: "center",
    // backgroundColor: COLORS.SECONDARY.RED,
    height: '100%',
    width: '100%',
  },
  customButtonNotNowParent: {
    alignSelf: 'center',
    backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
  },
  customButtonParent: {
    alignSelf: 'center',
    marginTop: 32,
  },
  card: {
    backgroundColor: COLORS.SECONDARY.WHITE,
    marginHorizontal: 32,
    borderRadius: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderColor: COLORS.SECONDARY.LIGHT_GREY,
    margin: 16,
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  dataCtr: {
    alignItems: 'center',
    // paddingVertical: 40,
    paddingTop: 16,
    paddingBottom: 44,
  },
});

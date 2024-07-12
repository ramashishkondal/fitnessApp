import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
  parent: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
  },
  headingText: {
    fontSize: SIZES.fontH4,
    textAlign: 'left',
    marginHorizontal: 16,
  },
  descriptionText: {
    textAlign: 'left',
    marginHorizontal: 16,
  },
  notificationsCtr: {
    backgroundColor: 'white',
    marginVertical: 32,
    zIndex: -1,
    flex: 1,
  },
  flatList: {
    marginVertical: 16,
  },
  menuCtr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeMenuCtr: {
    elevation: 20,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 1,
    borderRadius: SIZES.rounding0,
    right: 16,
    padding: 8,
    top: 8,
  },
  dots: {
    width: 6,
    height: 6,
    backgroundColor: COLORS.SECONDARY.GREY,
    borderRadius: 200,
    marginRight: 24,
    marginTop: 2,
  },
  menuText: {
    color: 'black',
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: SIZES.font13,
  },
  menuTextCtr: {
    borderBottomWidth: 1,
    borderColor: COLORS.SECONDARY.GREY,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginHorizontal: 8,
  },
  menuTextCtrLast: {
    borderColor: COLORS.SECONDARY.GREY,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginHorizontal: 8,
  },
  descriptionTextNoNotification: {
    textAlign: 'left',
    margin: 16,
    fontSize: SIZES.font17,
  },
  noNotificationTextCtr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

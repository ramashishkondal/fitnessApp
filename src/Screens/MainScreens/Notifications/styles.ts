import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
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
  },
  flatList: {marginVertical: 16},
  menuCtr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeMenuCtr: {
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 1,
    borderRadius: SIZES.rounding0,
    right: 32,
    padding: 8,
    top: 32,
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
  },
});

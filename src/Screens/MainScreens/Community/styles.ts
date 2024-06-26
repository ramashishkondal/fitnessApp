import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants';

export const styles = StyleSheet.create({
  parent: {
    flexGrow: 1,
    backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
  },
  titleCtr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  iconCtr: {
    padding: 10,
  },
  titleText: {
    fontSize: SIZES.fontH4,
  },
  photo: {
    width: 70,
    height: 70,
    borderRadius: 200,
  },
  storiesCtr: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatList: {
    marginVertical: 34,
  },
  selectCustomPhoto: {
    backgroundColor: COLORS.PRIMARY.DARK_GREY,
  },
});

import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
    paddingHorizontal: 24,
  },
  titleText: {
    fontSize: SIZES.fontH3,
    fontWeight: SIZES.fontBold1,
  },
  editProfileCtr: {
    marginTop: 40,
  },
});

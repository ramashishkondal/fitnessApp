import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    width: SIZES.width,
    height: '100%',
    zIndex: 10,
    backgroundColor: COLORS.PRIMARY.GREY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleCtr: {
    maxWidth: 320,
  },
  titleText: {
    fontSize: SIZES.fontH5,
    fontWeight: SIZES.fontBold1,
    textAlign: 'center',
  },
  textInput: {
    // textAlign: 'center',
    paddingHorizontal: 24,
  },
});

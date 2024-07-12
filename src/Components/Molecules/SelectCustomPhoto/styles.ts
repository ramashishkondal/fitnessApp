import {StyleSheet} from 'react-native';
import {SIZES, COLORS} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  cameraTypeOptionsCtr: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: SIZES.fontH2,
    color: 'white',
    fontWeight: 'bold',
    padding: 16,
  },
  modalCtr: {
    flex: 1,
    backgroundColor: COLORS.SECONDARY.WHITE,
    top: '15%',
  },
  iconsCtr: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icons: {
    backgroundColor: '#EEE5FF',
    padding: 10,
    borderRadius: SIZES.rounding3,
  },
  bottomSheetModalBackground: {
    borderRadius: SIZES.rounding3,
    shadowColor: 'red',
    shadowRadius: 100,
  },
  cameraOptionsCtr: {
    backgroundColor: COLORS.PRIMARY.PURPLE,
    padding: 10,
    borderRadius: SIZES.rounding3,
  },
});

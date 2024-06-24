import {StyleSheet} from 'react-native';
import {COLORS} from '../../../Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: 'flex-start',
    width: '100%',
  },
  childCtr: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
  },
  square: {
    backgroundColor: '#D6D9E0',
    width: 17,
    height: 17,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  squareChecked: {
    backgroundColor: COLORS.PRIMARY.PURPLE,
  },
  text: {
    fontSize: RFValue(12),
    marginLeft: 4,
    fontFamily: FONT_FAMILY.REGULAR,
    fontWeight: 500,
  },
});

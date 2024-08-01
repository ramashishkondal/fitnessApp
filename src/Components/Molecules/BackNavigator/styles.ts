import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    alignItems: 'center',
    left: -15,
  },
  title: {
    color: '#348AFE',
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: RFValue(15),
    fontWeight: '500',
    left: -RFValue(3),
  },
});

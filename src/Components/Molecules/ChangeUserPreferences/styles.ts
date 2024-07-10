import {StyleSheet} from 'react-native';
import {COLORS} from '../../../Constants';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 8,
    borderRadius: 10,
  },
  child: {
    flex: 3,
  },
  customButtonParentStyle: {
    marginTop: 80,
  },
});

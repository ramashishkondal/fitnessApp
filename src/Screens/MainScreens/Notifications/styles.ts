import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants';

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
});

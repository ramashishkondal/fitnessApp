import {StyleSheet} from 'react-native';
import {COLORS} from '../../../Constants';

export const styles = StyleSheet.create({
  parent: {
    marginHorizontal: 8,
    borderWidth: 3,
    borderColor: COLORS.PRIMARY.PURPLE,
    padding: 2,
    borderRadius: 200,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 200,
  },
});

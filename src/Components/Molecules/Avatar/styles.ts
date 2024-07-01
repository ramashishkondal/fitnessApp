import {StyleSheet} from 'react-native';
import {COLORS} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  avatarCtr: {
    borderColor: COLORS.PRIMARY.GREY,
    borderWidth: 5,
    marginHorizontal: 16,
    borderRadius: 200,
  },
  avatarSelected: {
    borderColor: COLORS.PRIMARY.PURPLE,
    borderWidth: 5,
    borderRadius: 200,
  },
  parent: {
    minWidth: 100,
    marginHorizontal: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 200,
  },
});

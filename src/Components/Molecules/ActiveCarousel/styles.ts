import {StyleSheet} from 'react-native';
import {COLORS} from '../../../Constants';

export const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  carousel: {
    backgroundColor: 'rgba(244,246,250,0.5)',
    width: 6,
    height: 6,
    borderRadius: 200,
  },
  carouselActive: {
    backgroundColor: COLORS.SECONDARY.WHITE,
    width: 8,
    height: 8,
  },
});

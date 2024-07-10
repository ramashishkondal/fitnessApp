import {StyleSheet} from 'react-native';
import {COLORS, FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: COLORS.PRIMARY.GREY,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: FONT_FAMILY.REGULAR,
    color: 'black',
  },
  text: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
});

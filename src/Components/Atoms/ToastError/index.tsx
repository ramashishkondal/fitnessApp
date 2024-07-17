import Toast from 'react-native-toast-message';
import {FONT_FAMILY, SIZES} from '../../../Constants/commonStyles';

const ToastError = (heading: string, body: string) => {
  Toast.show({
    type: 'error',
    text1: heading,
    text2: body,
    position: 'bottom',
    text1Style: {fontFamily: FONT_FAMILY.REGULAR, fontSize: SIZES.font13},
    text2Style: {fontFamily: FONT_FAMILY.REGULAR, fontSize: SIZES.font10},
    swipeable: true,
  });
};

export default ToastError;

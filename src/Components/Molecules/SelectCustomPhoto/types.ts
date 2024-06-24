import {StyleProp, ViewStyle} from 'react-native';
import {MediaType} from 'react-native-image-picker';

export type SelectCustomPhotoProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setPhoto:
    | React.Dispatch<React.SetStateAction<string>>
    | ((st: string) => void);
  parentStyle?: StyleProp<ViewStyle>;
  BottomSheetModalStyle?: StyleProp<
    Omit<ViewStyle, 'position' | 'left' | 'right' | 'top' | 'bottom'>
  >;
  mediaType?: MediaType;
  onSuccess?: (uri: string, type?: string) => void;
};

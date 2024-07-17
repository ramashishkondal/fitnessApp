// libs
import React from 'react';
import {View} from 'react-native';

// 3rd party

// custom
import {WithModalProps} from './types';
import {styles} from './styles';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

const WithModal: React.FC<WithModalProps> = ({
  modalVisible,
  children,
  setModalFalse,
  parentStyle,
  barShown = true,
}) => {
  console.log('with modal ere');
  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={setModalFalse}
      swipeDirection={'down'}
      avoidKeyboard={false}
      // statusBarTranslucent={true}
      renderToHardwareTextureAndroid
      style={[styles.parent, parentStyle]}
      propagateSwipe={true}>
      {barShown ? (
        <View style={styles.horizontalLineCtr}>
          <View style={styles.horizontalLine} />
        </View>
      ) : null}
      <View style={styles.modalCtr}>{children}</View>
      <Toast />
    </Modal>
  );
};

export default React.memo(WithModal);

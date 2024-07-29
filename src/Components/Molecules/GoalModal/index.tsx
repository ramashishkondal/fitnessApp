import React, {useCallback, useEffect, useState} from 'react';
import {Modal} from 'react-native';
import {GoalModalProps} from './types';
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {setModalShown} from '../../../Redux/Reducers/health';
import GoalAchieved from '../GoalAchieved';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

const GoalModal: React.FC<GoalModalProps> = ({children}) => {
  // state use
  const [modalVisible, setModalVisible] = useState(false);

  // redux use
  const {
    value: {
      todaysSteps,
      goal: {totalSteps},
    },
    goalAchieved: {modalShown},
  } = useAppSelector(state => state.health);
  const {id} = useAppSelector(state => state.User.data);
  const dispatch = useAppDispatch();

  // functions
  const handleModalFalse = useCallback(() => setModalVisible(false), []);
  useEffect(() => {
    if (todaysSteps / totalSteps >= 1 && modalShown === false) {
      setModalVisible(true);
      dispatch(setModalShown(true));
      // if (id) {
      //   sendNotification(
      //     {
      //       isUnread: true,
      //       isShownViaPushNotification: false,
      //       message: 'Daily Goal Achieved',
      //       userId: 'App',
      //     },
      //     id,
      //   );
      // }
    }
  }, [dispatch, id, modalShown, todaysSteps, totalSteps]);

  return (
    <SafeAreaView style={styles.parent}>
      {children}
      {modalVisible ? (
        <Modal animationType="slide" visible={modalVisible} transparent>
          <GoalAchieved setModalFalse={handleModalFalse} />
        </Modal>
      ) : null}
    </SafeAreaView>
  );
};

export default GoalModal;

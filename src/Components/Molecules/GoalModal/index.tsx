import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {GoalModalProps} from './types';
import WithModal from '../WithModal';
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {setModalShown} from '../../../Redux/Reducers/health';
import GoalAchieved from '../GoalAchieved';
import {styles} from './styles';

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
  const dispatch = useAppDispatch();

  // functions
  const handleModalFalse = useCallback(() => setModalVisible(false), []);

  if (todaysSteps / totalSteps >= 1 && modalShown === false) {
    setModalVisible(true);
    dispatch(setModalShown(true));
  }

  return (
    <View style={styles.parent}>
      {children}
      {modalShown ? (
        <WithModal
          modalVisible={modalVisible}
          setModalFalse={handleModalFalse}
          parentStyle={styles.withModalParent}
          barShown={false}>
          <GoalAchieved setModalFalse={handleModalFalse} />
        </WithModal>
      ) : null}
    </View>
  );
};

export default GoalModal;

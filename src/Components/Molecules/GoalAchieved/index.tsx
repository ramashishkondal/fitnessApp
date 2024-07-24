import React, {useCallback} from 'react';
import {Text, View, TouchableOpacity, Alert, Share} from 'react-native';
import {GoalAchievedProps} from './types';
import {styles} from './styles';
import {useAppSelector} from '../../../Redux/Store';
import {CustomButton, CustomImage, HeadingText} from '../../Atoms';
import {COLORS, ICONS, SIZES, SPACING} from '../../../Constants';
import {getPercentage} from '../../../Utils/commonUtils';
import InsidePieChart from '../InsidePieChart';
import {PieChart} from 'react-native-gifted-charts';
import DataInfoCompare from '../DataInfoCompare';

const GoalAchieved: React.FC<GoalAchievedProps> = ({setModalFalse}) => {
  // redux use
  const {firstName, lastName, photo} = useAppSelector(state => state.User.data);
  const {
    todaysSteps,
    nutrition,
    goal: {totalSteps},
  } = useAppSelector(state => state.health.value);

  // state dependent constants
  const stepsCompletionPercentage = Math.ceil(
    getPercentage(todaysSteps, totalSteps),
  );
  const pieData = [
    {value: stepsCompletionPercentage, color: COLORS.PRIMARY.PURPLE},
    {value: 100 - stepsCompletionPercentage, color: COLORS.SECONDARY.WHITE},
  ];

  // callback use
  const centerLabelComponent = useCallback(() => {
    return <InsidePieChart value={todaysSteps} text="steps today" />;
  }, [todaysSteps]);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'I just completed my daily goal in Fitness App',
        title: 'Daily Achievement',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  return (
    <TouchableOpacity
      style={styles.backdrop}
      activeOpacity={1}
      onPress={setModalFalse}>
      <TouchableOpacity style={styles.parent} activeOpacity={1}>
        <TouchableOpacity style={styles.closeCtr} onPress={setModalFalse}>
          {ICONS.Close({width: 36, height: 36})}
        </TouchableOpacity>
        <View style={styles.childCtrTop} />
        <View style={styles.childCtrBottom} />
        <View style={styles.cardCtr}>
          <View style={styles.headingCtr}>
            <HeadingText
              text="Goal Achieved!"
              textStyle={{color: COLORS.SECONDARY.WHITE}}
            />
            <HeadingText
              text="Share with friends!"
              textStyle={{color: COLORS.SECONDARY.WHITE}}
            />
          </View>
          <View style={styles.card}>
            <View style={styles.userInfo}>
              <View style={styles.userInfoCtr}>
                <CustomImage
                  source={{uri: photo}}
                  parentStyle={styles.customImageParent}
                  imageStyle={styles.customImage}
                />
                <Text style={styles.userNameText}>
                  {firstName + ' ' + lastName}
                </Text>
              </View>
              {ICONS.Logo({width: 28, height: 28})}
            </View>
            <View style={styles.dataCtr}>
              <PieChart
                donut
                isAnimated
                radius={SIZES.height / 8}
                innerRadius={SIZES.height / 8 - 8}
                innerCircleColor={COLORS.SECONDARY.WHITE}
                data={pieData}
                centerLabelComponent={centerLabelComponent}
              />
              <DataInfoCompare
                doneItems={nutrition}
                total={totalSteps}
                doneItemsInfoName="Cal Burned"
                totalInfoName="Daily Goal"
                parentStyle={SPACING.mt3}
              />
            </View>
          </View>
          <CustomButton
            title="Share to friend"
            parentStyle={styles.customButtonParent}
            onPress={onShare}
          />
          <CustomButton
            title="Not now"
            parentStyle={styles.customButtonNotNowParent}
            textStyle={{color: COLORS.PRIMARY.PURPLE}}
            onPress={setModalFalse}
          />
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default GoalAchieved;

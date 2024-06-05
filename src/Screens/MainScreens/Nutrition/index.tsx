// libs
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

// custom
import { styles } from "./styles";
import { COLORS } from "../../../Constants";
import { NutritionProps } from "../../../Defs/navigators";
import { NutritionHeaderRight } from "../../../Components";
import AddFoodModal from "../../../Components/AddFoodModal";

const Nutrition = ({ navigation }: NutritionProps) => {
  const pieData3 = [
    { value: 63, color: "#F7A56D", text: "" },
    { value: 37, color: COLORS.PRIMARY.LIGHT_PURPLE },
  ];
  const pieData2 = [
    { value: 30, color: "#7265E3", text: "" },
    { value: 70, color: COLORS.PRIMARY.LIGHT_PURPLE },
  ];
  const pieData1 = [
    { value: 27, color: "#44C7BC", text: "" },
    { value: 73, color: COLORS.PRIMARY.LIGHT_PURPLE },
  ];
  const [modalVisible, setModalVisible] = useState(false);
  const handleOnPress = () => setModalVisible(true);
  const headerRight = () => (
    <NutritionHeaderRight handleOnPress={handleOnPress} />
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, []);
  return (
    <View style={styles.parent}>
      <Text style={styles.titleText}>You burned 300 calories today</Text>
      <View style={styles.childCtr}>
        <View style={styles.pieChart}>
          <View style={{ position: "relative" }}>
            <PieChart
              donut
              showText
              radius={80}
              innerRadius={65}
              data={pieData1}
              edgesRadius={2000}
              curvedEndEdges={true}
              curvedStartEdges={true}
              startAngle={100}
              innerCircleColor={COLORS.PRIMARY.DARK_GREY}
            />
          </View>
          <View style={{ position: "absolute" }}>
            <PieChart
              donut
              showText
              radius={60}
              innerRadius={45}
              data={pieData2}
              innerCircleColor={COLORS.PRIMARY.DARK_GREY}
            />
          </View>
          <View style={{ position: "absolute" }}>
            <PieChart
              donut
              showText
              radius={40}
              innerRadius={25}
              data={pieData3}
              innerCircleColor={COLORS.PRIMARY.DARK_GREY}
              edgesRadius={120}
            />
          </View>
        </View>
        <View>
          <Text>Protein</Text>
          <Text>Carb</Text>
          <Text>Fat</Text>
        </View>
      </View>
      <View style={styles.statisticsCtr}>
        <Text>awd</Text>
      </View>
      <View style={styles.foodCtr}></View>
      <AddFoodModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default Nutrition;

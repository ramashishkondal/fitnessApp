import React from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { styles } from "./styles";

const WithOnboarding = (
  WrappedComponent: <Props>(props: any) => React.JSX.Element
) => {
  return (props: any) => (
    <SafeAreaView style={styles.parent}>
      <ScrollView style={styles.parent}>
        <WrappedComponent {...props} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WithOnboarding;

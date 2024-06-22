import React from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import {styles} from './styles';

const WithOnboarding = (WrappedComponent: React.FC<any>) => {
  return (props: any) => (
    <SafeAreaView style={styles.parent}>
      <ScrollView style={styles.parent}>
        <WrappedComponent {...props} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WithOnboarding;

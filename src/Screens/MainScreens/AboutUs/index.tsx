import React from 'react';
import {Text, ScrollView, View} from 'react-native';
import {ICONS} from '../../../Constants';
import {styles} from './styles';

const AboutUs = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logo}>{ICONS.Logo({width: 70, height: 70})}</View>
      {/* <Text style={styles.title}>About Us</Text> */}
      <Text style={styles.sectionTitle}>Our Mission</Text>
      <Text style={styles.text}>
        At FitnessApp, our mission is to empower you to lead a healthier and
        more active lifestyle. We believe that fitness should be accessible to
        everyone, regardless of their starting point.
      </Text>
      <Text style={styles.sectionTitle}>Our Vision</Text>
      <Text style={styles.text}>
        Our vision is to create a supportive community where individuals can
        achieve their fitness goals through personalized workout plans,
        nutrition guidance, and motivational support.
      </Text>
      <Text style={styles.sectionTitle}>Our Values</Text>
      <Text style={styles.text}>
        We value commitment, inclusivity, and continuous improvement. We strive
        to provide the best tools and resources to help you stay motivated and
        on track.
      </Text>
      <Text style={styles.sectionTitle}>Meet the Team</Text>
      <Text style={styles.text}>
        Our team is composed of fitness enthusiasts, nutrition experts, and tech
        professionals who are passionate about making fitness fun and
        accessible. We work tirelessly to bring you the latest in fitness
        technology and support.
      </Text>
      <Text style={styles.sectionTitle}>Contact Us</Text>
      <Text style={styles.text}>
        Have questions or feedback? We’d love to hear from you! Contact us at
        support@fitnessapp.com.
      </Text>
    </ScrollView>
  );
};

export default AboutUs;

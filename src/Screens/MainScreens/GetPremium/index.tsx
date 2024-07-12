// libs
import React, {useState} from 'react';
import {Alert, Image, Platform, Text, View} from 'react-native';

// custom
import {styles} from './styles';
import Carousel from 'react-native-reanimated-carousel';
import {IMAGES, SIZES} from '../../../Constants';
import ActiveCarousel from '../../../Components/Molecules/ActiveCarousel';
import {CustomButton, DescriptionText, HeadingText} from '../../../Components';
import PremiumSelectorCard from '../../../Components/Molecules/PremiumSelectorCard';
import {ScrollView} from 'react-native-gesture-handler';

const GetPremium = () => {
  // state use
  const [activeCarousel, setActiveCarousel] = useState<number>(0);
  const [paymentChoice, setPaymentChoice] = useState<
    'monthly' | 'yearly' | null
  >('monthly');

  // state dependent constants
  const carouselItems = [
    {
      image: IMAGES.GET_PREMIUM[1],
      heading: 'Get a Personal Trainer',
      desc: 'Our premium package includes a weekly 1-hour session with a personal trainer.',
    },
    {
      image: IMAGES.GET_PREMIUM[2],
      heading: 'Go Premium, get unlimited access',
      desc: 'When you subscribe, you get instant unlimited access to all resources.',
    },
    {
      image: IMAGES.GET_PREMIUM[3],
      heading: 'Go Premium, get unlimited access',
      desc: 'When you subscribe, you get instant unlimited access to all resources.',
    },
  ];

  return (
    <ScrollView style={styles.parent} showsVerticalScrollIndicator={false}>
      <Carousel
        loop
        autoPlay
        autoPlayInterval={5000}
        scrollAnimationDuration={1000}
        width={SIZES.width}
        height={Platform.OS === 'ios' ? SIZES.height / 3.7 : SIZES.height / 4}
        data={carouselItems}
        onSnapToItem={index => setActiveCarousel(index)}
        renderItem={({index, item}) => (
          <View key={index} style={styles.imageCtr}>
            <Image
              source={item.image}
              style={{width: SIZES.width}}
              resizeMode="contain"
            />
          </View>
        )}
      />
      <View style={styles.activeCarouselCtr}>
        <ActiveCarousel
          activeIndex={activeCarousel}
          length={carouselItems.length}
        />
      </View>
      <View style={styles.childCtr}>
        <View style={styles.headingCtr}>
          <HeadingText text={carouselItems[activeCarousel].heading} />
          <DescriptionText
            text={carouselItems[activeCarousel].desc}
            textStyle={styles.descriptionText}
          />
        </View>
        <View style={styles.premiumSelectorCtr}>
          <PremiumSelectorCard
            priceText="4.99"
            priceIntervalTime="month"
            isChecked={paymentChoice === 'monthly'}
            setIsChecked={val => {
              if (val) {
                setPaymentChoice('monthly');
              } else {
                setPaymentChoice(null);
              }
            }}
          />
          <PremiumSelectorCard
            priceText="89.99"
            priceIntervalTime="year"
            isChecked={paymentChoice === 'yearly'}
            setIsChecked={val => {
              if (val) {
                setPaymentChoice('yearly');
              } else {
                setPaymentChoice(null);
              }
            }}
          />
        </View>
        <View style={styles.footerCtr}>
          <Text style={styles.recurringText}>
            Recurring billing, cancel anytime
          </Text>
          <Text style={styles.recurringDescriptionText}>
            Contrary to what many people think, eating healthy is not easier
            said than done. Just a few good habits can make a great difference.
          </Text>
        </View>
        <CustomButton
          title="Purchase"
          parentStyle={styles.customParent}
          onPress={() => {
            if (paymentChoice === null) {
              Alert.alert('Error', 'Please select a billing method');
              return;
            }
            Alert.alert(
              'Email Sent',
              'Confirmation email sent to you email address',
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default GetPremium;

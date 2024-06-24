// libs
import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';

// custom
import {styles} from './styles';
import Carousel from 'react-native-reanimated-carousel';
import {IMAGES, SIZES} from '../../../Constants';
import ActiveCarousel from '../../../Components/Molecules/ActiveCarousel';
import {CustomButton, DescriptionText, HeadingText} from '../../../Components';
import PremiumSelectorCard from '../../../Components/Molecules/PremiumSelectorCard';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

const GetPremium = () => {
  // state use
  const [activeCarousel, setActiveCarousel] = useState<number>(0);
  const [paymentChoice, setPaymentChoice] = useState<
    'monthly' | 'yearly' | null
  >(null);

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
    <View style={styles.parent}>
      <Carousel
        loop
        autoPlay
        autoPlayInterval={5000}
        scrollAnimationDuration={1000}
        width={SIZES.width}
        height={SIZES.height / 3.25}
        data={carouselItems}
        onSnapToItem={index => setActiveCarousel(index)}
        renderItem={({index, item}) => (
          <View
            key={index}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              backgroundColor: 'red',
            }}>
            <Image source={item.image} style={{width: SIZES.width}} />
          </View>
        )}
      />
      <View
        style={{
          position: 'absolute',
          width: 100,
          top: SIZES.height / 3.85,
          left: SIZES.width / 2 - 50,
        }}>
        <ActiveCarousel
          activeIndex={activeCarousel}
          length={carouselItems.length}
        />
      </View>
      <View style={{flex: 3, marginTop: 56}}>
        <View
          style={{
            marginTop: 32,
            height: SIZES.height / 6,
            marginHorizontal: 48,
          }}>
          <HeadingText text={carouselItems[activeCarousel].heading} />
          <DescriptionText
            text={carouselItems[activeCarousel].desc}
            textStyle={{marginTop: 8}}
          />
        </View>
        <View style={{marginHorizontal: 16}}>
          <PremiumSelectorCard
            priceText="4.99"
            priceIntervalTime="month"
            isChecked={paymentChoice == 'monthly'}
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
        <View style={{marginHorizontal: 48, marginVertical: 24}}>
          <Text
            style={{
              fontFamily: FONT_FAMILY.BOLD,
              textAlign: 'center',
              fontSize: SIZES.font9,
            }}>
            Recurring billing, cancel anytime
          </Text>
          <Text
            style={{
              fontFamily: FONT_FAMILY.REGULAR,
              textAlign: 'center',
              fontSize: SIZES.font9,
            }}>
            Contrary to what many people think, eating healthy is not easier
            said than done. Just a few good habits can make a great difference.
          </Text>
        </View>
        <CustomButton title="Purchase" parentStyle={{alignSelf: 'center'}} />
      </View>
    </View>
  );
};

export default GetPremium;

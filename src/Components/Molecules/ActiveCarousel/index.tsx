// libs
import React from 'react';
import {View} from 'react-native';

// custom
import {ActiveCarouselProps} from './types';
import {styles} from './styles';

const ActiveCarousel: React.FC<ActiveCarouselProps> = ({
  activeIndex,
  length,
}) => {
  const arr = Array(length)
    .fill(-1)
    .map((_val, index) => (
      <View
        key={index}
        style={[
          styles.carousel,
          activeIndex === index ? styles.carouselActive : null,
        ]}
      />
    ));
  return <View style={styles.parent}>{arr}</View>;
};

export default ActiveCarousel;

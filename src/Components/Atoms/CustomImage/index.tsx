// libs
import React, {useState} from 'react';
import {View} from 'react-native';

import FastImage from 'react-native-fast-image';

// custom
import {CustomImageProps} from './types';
import {styles} from './styles';
import CustomLoading from '../CustomLoading';
import {COLORS} from '../../../Constants';

const CustomImage: React.FC<CustomImageProps> = ({
  source,
  imageStyle,
  activityIndicatorSize,
  parentStyle,
  handleLoadEnd = () => {},
  resizeMode,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <View style={[styles.parent, parentStyle]}>
      {isLoading ? (
        <CustomLoading
          color={COLORS.PRIMARY.PURPLE}
          style={styles.loadingStyle}
          size={activityIndicatorSize}
        />
      ) : null}
      <FastImage
        source={source}
        style={[styles.image, imageStyle]}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => {
          setIsLoading(false);
          handleLoadEnd();
        }}
        resizeMode={resizeMode}
      />
    </View>
  );
};

export default CustomImage;

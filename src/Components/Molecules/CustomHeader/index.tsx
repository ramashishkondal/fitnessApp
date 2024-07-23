// libs
import React, {useCallback, useMemo} from 'react';
import {
  Dimensions,
  TouchableOpacity,
  View,
  SafeAreaView,
  Platform,
} from 'react-native';

// 3rd party
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

// types
import {ICONS} from '../../../Constants/icons';
import {styles} from './styles';
import {useAppDispatch} from '../../../Redux/Store';
import {resetUserData} from '../../../Redux/Reducers/currentUser';

const CustomHeader: React.FC<NativeStackHeaderProps> = props => {
  //redux use
  const dispatch = useAppDispatch();
  // callback use
  const goBack = useCallback(() => {
    props.navigation.goBack();
  }, [props.navigation]);

  const headerHeight = useMemo(() => {
    if (props.route.name === 'AddInterests') {
      if (Platform.OS === 'ios') {
        return Dimensions.get('screen').height / 9.5;
      } else {
        return Dimensions.get('screen').height / 12;
      }
    } else if (Platform.OS === 'ios') {
      return Dimensions.get('screen').height / 4.5;
    } else if (Platform.OS === 'android') {
      return Dimensions.get('screen').height / 6.0;
    }
  }, [props.route.name]);

  // functions
  const goToLandingPage = () => {
    props.navigation.navigate('LandingPage');
    dispatch(resetUserData());
  };

  return (
    <SafeAreaView
      style={[
        {
          height: headerHeight,
        },
        styles.parent,
      ]}>
      <View style={styles.Container}>
        {props.navigation.canGoBack() ? (
          <TouchableOpacity style={styles.backCtr} onPress={goBack}>
            {ICONS.LeftArrow({width: 17, height: 17})}
          </TouchableOpacity>
        ) : null}
        <View style={styles.logoCtr}>
          <TouchableOpacity activeOpacity={0.6} onPress={goToLandingPage}>
            {ICONS.Logo({width: 60, height: 60})}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const Header = (props: NativeStackHeaderProps) => <CustomHeader {...props} />;

export default Header;

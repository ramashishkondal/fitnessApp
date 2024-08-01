// libs
import React from 'react';
import RootNavigator from './Navigators/RootNavigator';
import {Provider} from 'react-redux';
import {persistor, store} from './Redux/Store';
import {PersistGate} from 'redux-persist/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ModalPortal} from 'react-native-modals';
import {RealmProvider} from '@realm/react';
import {SingleStoryDb, StoryDb} from './DbModels/story';
import {PostDb} from './DbModels/post';
import {UserDb, UserPreferencesAndInterests} from './DbModels/user';
import {FoodDb, MealDb} from './DbModels/mealData';
import Toast, {ErrorToast} from 'react-native-toast-message';
import DeviceInfo from 'react-native-device-info';
import {COLORS} from './Constants';

const toastConfig = {
  error: (props: any) => {
    if (DeviceInfo.isTablet()) {
      return (
        <ErrorToast
          {...props}
          style={{
            height: 100,
            width: 500,
            borderColor: COLORS.SECONDARY.RED,
            borderLeft: 10,
          }}
          text1NumberOfLines={2}
          text2NumberOfLines={2}
        />
      );
    }
    return (
      <ErrorToast {...props} text1NumberOfLines={2} text2NumberOfLines={2} />
    );
  },
};

const App = () => {
  return (
    <RealmProvider
      schema={[
        StoryDb,
        SingleStoryDb,
        PostDb,
        UserDb,
        UserPreferencesAndInterests,
        MealDb,
        FoodDb,
      ]}>
      <GestureHandlerRootView>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RootNavigator />
            <Toast config={toastConfig} />
          </PersistGate>
          <ModalPortal />
        </Provider>
      </GestureHandlerRootView>
    </RealmProvider>
  );
};

export default App;

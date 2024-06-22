import {DrawerScreenProps} from '@react-navigation/drawer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {StoryData} from '../Utils/userUtils';

// app drawer navigator
export type homeDrawerParamList = {
  HomeScreen: undefined;
  Notifications: undefined;
  Community: undefined;
  GetPremium: undefined;
  Settings: undefined;
  LogOut: undefined;
};

export type HomeScreenProps = CompositeScreenProps<
  DrawerScreenProps<homeDrawerParamList, 'HomeScreen'>,
  NativeStackScreenProps<appStackParamList>
>;
export type NotificationsProps = CompositeScreenProps<
  DrawerScreenProps<homeDrawerParamList, 'Notifications'>,
  NativeStackScreenProps<appStackParamList>
>;
export type CommunityProps = CompositeScreenProps<
  DrawerScreenProps<homeDrawerParamList, 'Community'>,
  NativeStackScreenProps<appStackParamList>
>;
export type GetPremiumProps = CompositeScreenProps<
  DrawerScreenProps<homeDrawerParamList, 'GetPremium'>,
  NativeStackScreenProps<appStackParamList>
>;
export type SettingsProps = CompositeScreenProps<
  DrawerScreenProps<homeDrawerParamList, 'Settings'>,
  NativeStackScreenProps<appStackParamList>
>;
export type LogOutProps = CompositeScreenProps<
  DrawerScreenProps<homeDrawerParamList, 'LogOut'>,
  NativeStackScreenProps<appStackParamList>
>;

// onboarding stack navigator
export type onboardingStackParamList = {
  LandingPage: undefined;
  SignIn: undefined;
  AddEmail: undefined;
  AddPassword: undefined;
  AddFirstName: undefined;
  AddLastName: undefined;
  AddFingerprint: undefined;
  AddProfilePicture: undefined;
  AddPreferences: undefined;
  AddInterests: undefined;
  AddGender: undefined;
  DetailsCompleted: undefined;
  ForgotPassword: undefined;
};
export type LandingPageProps = NativeStackScreenProps<
  onboardingStackParamList,
  'LandingPage'
>;
export type SignInProps = NativeStackScreenProps<
  onboardingStackParamList,
  'SignIn'
>;
export type AddEmailLogInProps = NativeStackScreenProps<
  onboardingStackParamList,
  'AddEmail'
>;
export type AddPasswordProps = NativeStackScreenProps<
  onboardingStackParamList,
  'AddPassword'
>;
export type AddFingerprintProps = NativeStackScreenProps<
  onboardingStackParamList,
  'AddFingerprint'
>;
export type AddProfilePictureProps = NativeStackScreenProps<
  onboardingStackParamList,
  'AddProfilePicture'
>;
export type AddPreferencesProps = NativeStackScreenProps<
  onboardingStackParamList,
  'AddPreferences'
>;
export type AddInterestsProps = NativeStackScreenProps<
  onboardingStackParamList,
  'AddInterests'
>;
export type AddGenderProps = NativeStackScreenProps<
  onboardingStackParamList,
  'AddGender'
>;
export type DetailsCompletedProps = NativeStackScreenProps<
  onboardingStackParamList,
  'DetailsCompleted'
>;
export type ForgotPasswordProps = NativeStackScreenProps<
  onboardingStackParamList,
  'ForgotPassword'
>;

// home stack navigator
export type appStackParamList = {
  HomeNavigator: NavigatorScreenParams<homeDrawerParamList>;
  Nutrition: undefined;
  WaterIntake: undefined;
  DailySteps: undefined;
  PostScreen: {postId: string};
  StoriesScreen: {allStoryData: Array<StoryData>; index: number};
  EditProfile: undefined;
};
export type AppNavigationProps = NativeStackNavigationProp<appStackParamList>;

export type NutritionProps = NativeStackScreenProps<
  appStackParamList,
  'Nutrition'
>;
export type HomeNavigatorProps = NativeStackScreenProps<
  appStackParamList,
  'HomeNavigator'
>;
export type WaterIntakeProps = NativeStackScreenProps<
  appStackParamList,
  'WaterIntake'
>;
export type DailyStepsProps = NativeStackScreenProps<
  appStackParamList,
  'DailySteps'
>;
export type PostScreenProps = NativeStackScreenProps<
  appStackParamList,
  'PostScreen'
>;
export type StoriesScreenProps = NativeStackScreenProps<
  appStackParamList,
  'StoriesScreen'
>;

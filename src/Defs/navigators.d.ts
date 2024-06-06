import { DrawerScreenProps } from "@react-navigation/drawer";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CompositeScreenProps } from "@react-navigation/native";

// app drawer navigator
export type appDrawerParamList = {
  HomeScreen: undefined;
  Notifications: undefined;
  Community: undefined;
  GetPremium: undefined;
  Settings: undefined;
  LogOut: undefined;
};

export type HomeScreenProps = CompositeScreenProps<
  NativeStackScreenProps<homeStackParamList>,
  DrawerScreenProps<appDrawerParamList, "Home">
>;
export type NotificationsProps = CompositeScreenProps<
  NativeStackScreenProps<homeStackParamList>,
  DrawerScreenProps<appDrawerParamList, "Notifications">
>;
export type CommunityProps = CompositeScreenProps<
  NativeStackScreenProps<homeStackParamList>,
  DrawerScreenProps<appDrawerParamList, "Community">
>;
export type GetPremiumProps = CompositeScreenProps<
  NativeStackScreenProps<homeStackParamList>,
  DrawerScreenProps<appDrawerParamList, "GetPremium">
>;
export type SettingsProps = CompositeScreenProps<
  NativeStackScreenProps<homeStackParamList>,
  DrawerScreenProps<appDrawerParamList, "Settings">
>;
export type LogOutProps = CompositeScreenProps<
  NativeStackScreenProps<homeStackParamList>,
  DrawerScreenProps<appDrawerParamList, "LogOut">
>;

// onboarding stack navigator
export type onboardingStackParamList = {
  LandingPage: undefined;
  SignIn: undefined;
  AddEmail: undefined;
  AddPassword: undefined;
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
  "LandingPage"
>;
export type SignInProps = NativeStackScreenProps<
  onboardingStackParamList,
  "SignIn"
>;
export type AddEmailLogInProps = NativeStackScreenProps<
  onboardingStackParamList,
  "EmailLogIn"
>;
export type AddPasswordProps = NativeStackScreenProps<
  onboardingStackParamList,
  "AddPassword"
>;
export type AddFingerprintProps = NativeStackScreenProps<
  onboardingStackParamList,
  "AddFingerprintProps"
>;
export type AddProfilePictureProps = NativeStackScreenProps<
  onboardingStackParamList,
  "AddProfilePicture"
>;
export type AddPreferencesProps = NativeStackScreenProps<
  onboardingStackParamList,
  "AddPreferences"
>;
export type AddInterestsProps = NativeStackScreenProps<
  onboardingStackParamList,
  "AddInterests"
>;
export type AddGenderProps = NativeStackScreenProps<
  onboardingStackParamList,
  "AddGender"
>;
export type DetailsCompletedProps = NativeStackScreenProps<
  onboardingStackParamList,
  "DetailsCompleted"
>;
export type ForgotPasswordProps = NativeStackScreenProps<
  onboardingStackParamList,
  "ForgotPassword"
>;

// home stack navigator
export type homeStackParamList = {
  HomeNavigator: undefined;
  Nutrition: undefined;
  WaterIntake: undefined;
  DailySteps: undefined;
};
export type NutritionProps = NativeStackScreenProps<
  homeStackParamList,
  "Nutrition"
>;
export type HomeNavigatorProps = NativeStackScreenProps<
  homeStackParamList,
  "HomeScreen"
>;
export type WaterIntakeProps = NativeStackScreenProps<
  homeStackParamList,
  "WaterIntake"
>;
export type DailyStepsProps = NativeStackScreenProps<
  homeStackParamList,
  "DailySteps"
>;

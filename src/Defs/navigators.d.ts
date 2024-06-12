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
  DrawerScreenProps<appDrawerParamList, "HomeScreen">,
  NativeStackScreenProps<homeStackParamList>
>;
export type NotificationsProps = CompositeScreenProps<
  DrawerScreenProps<appDrawerParamList, "Notifications">,
  NativeStackScreenProps<homeStackParamList>
>;
export type CommunityProps = CompositeScreenProps<
  DrawerScreenProps<appDrawerParamList, "Community">,
  NativeStackScreenProps<homeStackParamList>
>;
export type GetPremiumProps = CompositeScreenProps<
  DrawerScreenProps<appDrawerParamList, "GetPremium">,
  NativeStackScreenProps<homeStackParamList>
>;
export type SettingsProps = CompositeScreenProps<
  DrawerScreenProps<appDrawerParamList, "Settings">,
  NativeStackScreenProps<homeStackParamList>
>;
export type LogOutProps = CompositeScreenProps<
  DrawerScreenProps<appDrawerParamList, "LogOut">,
  NativeStackScreenProps<homeStackParamList>
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
  HomeNavigator: NavigatorScreenParams<appDrawerParamList>;
  Nutrition: undefined;
  WaterIntake: undefined;
  DailySteps: undefined;
  PostScreen: { postId: string };
};
export type NutritionProps = NativeStackScreenProps<
  homeStackParamList,
  "Nutrition"
>;
export type HomeNavigatorProps = NativeStackScreenProps<
  homeStackParamList,
  "HomeNavigator"
>;
export type WaterIntakeProps = NativeStackScreenProps<
  homeStackParamList,
  "WaterIntake"
>;
export type DailyStepsProps = NativeStackScreenProps<
  homeStackParamList,
  "DailySteps"
>;
export type PostScreenProps = NativeStackScreenProps<
  homeStackParamList,
  "PostScreen"
>;

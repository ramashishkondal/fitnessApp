import { DrawerScreenProps } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type appDrawerParamList = {
  Home: undefined;
};
export type HomeScreenProps = DrawerScreenProps<appDrawerParamList, "Home">;

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

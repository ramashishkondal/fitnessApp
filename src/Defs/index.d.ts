import { NativeStackScreenProps } from "@react-navigation/native-stack";

// user types
export type User = {
  firstName: string;
  lastName: string;
  email: string;
  finger: boolean;
  photo: string | undefined;
  gender: "male" | "female" | null;
  preferences: Array<string>;
  interests: Array<string>;
};

// navigators types
export type rootStackParamList = {
  Onboarding: undefined;
};
export type OnboardingScreenProps = NativeStackScreenProps<
  rootStackParamList,
  "Onboarding"
>;

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
  DetailsCompleted: undefinde;
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

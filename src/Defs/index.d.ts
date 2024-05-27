import { NativeStackScreenProps } from "@react-navigation/native-stack";

// user types
export type User = {
  firstName: string;
  lastName: string;
  email: string;
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
  EmailLogIn: undefined;
  AddPassword: undefined;
};
export type LandingPageProps = NativeStackScreenProps<
  onboardingStackParamList,
  "LandingPage"
>;
export type SignInProps = NativeStackScreenProps<
  onboardingStackParamList,
  "SignIn"
>;
export type EmailLogInProps = NativeStackScreenProps<
  onboardingStackParamList,
  "EmailLogIn"
>;
export type AddPasswordProps = NativeStackScreenProps<
  onboardingStackParamList,
  "AddPassword"
>;

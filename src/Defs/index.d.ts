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
export type LandingPageProps = NativeStackScreenProps<
  rootStackParamList,
  "Onboarding"
>;

export type onboardingStackParamList = {
  LandingPage: undefined;
};
export type LandingPageProps = NativeStackScreenProps<
  onboardingStackParamList,
  "LandingPage"
>;

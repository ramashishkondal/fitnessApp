import { NativeStackScreenProps } from "@react-navigation/native-stack";

// user types
export type User = {
  firstName: string;
  lastName: string;
  email: string;
  finger: boolean;
  photo: string | undefined;
  gender: "male" | "female";
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
  EmailLogIn: undefined;
  AddPassword: Pick<User, "email">;
  FingerPrint: Pick<User, "email" | "password">;
  ProfilePicture: Pick<User, "email" | "password" | "photo"> & {
    finger: string;
  };
  Preferences: Pick<User, "email" | "password" | "photo"> & { finger: string };
  Interests: Pick<User, "email" | "password" | "photo"> & {
    finger: string;
    gender: User["gender"];
  };
  Gender: Pick<User, "email" | "password" | "photo" | "interests"> & {
    finger: string;
    gender: User["gender"];
  };
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

import {Platform} from 'react-native';

export const STRING = {
  COMMON_ERRORS: {
    NETWORK_ERROR: {
      TITLE: 'Network Error',
      BODY: 'Internet connection is disabled',
    },
  },
  LANDING_PAGE: {
    TITLE: 'Welcome to Fitness App',
    TITLE_DESCRIPTION:
      'The best UI Kit for your next health and fitness project',
    BUTTON_TEXT: 'Get Started',
    SIGNIN_1: 'Already have an account?',
    SIGNIN_2: 'Sign in',
  },
  SIGNIN: {
    EMAIL: 'Email Address',
    PASSWORD: 'Password',
    SIGN_IN_WITH: 'Sign in with',
    BUTTON_TEXT: 'Continue',
    FORGOT_PASSWORD: ' Forgot Password?',
  },
  ADD_EMAIL: {
    TITLE: 'What is your email address?',
    TEXT_INPUT_PLACEHOLDER: 'Enter your email address',
    BUTTON_TEXT: 'Continue',
    EMAIL_ERROR: 'Invalid Email Address',
  },
  ADD_PASSWORD: {
    TITLE: "Now let's setup your password",
    TEXT_INPUT_PLACEHOLDER: 'Enter your password',
    BUTTON_TEXT: 'Continue',
    CHECKS: {
      LENGTH: 'Minimum 6 characters',
      CASE: 'At least 1 uppercase',
      NUMBER: 'At least 1 number',
      SPECIAL_CHAR: 'At least 1 special character',
    },
    ERROR: {
      HEADING: 'Invalid Password',
      BODY_LENGTH: 'Password should have minimum 6 characters.',
      BODY_UPPERCASE: '1 uppercase character missing from password.',
      BODY_NUMBER: '1 number missing from password.',
      BODY_SPECIAL_CHARACTER: '1 special character missing from password.',
      EMPTY: "Password can't be empty",
    },
  },
  ADD_FINGERPRINT: {
    TITLE: Platform.OS === 'android' ? 'Enable Fingerprint' : 'Enable Face ID',
    TITLE_DESCRIPTION: `If you enable ${
      Platform.OS === 'android' ? 'touch ID' : 'Face ID'
    }, you don't need to enter your password when you login.`,
    SUBMIT_BUTTON_TEXT: 'Continue',
    REJECT_BUTTON_TEXT: 'Not Now',
  },
  ADD_PROFILE_PICTURE: {
    TITLE: 'Profile Picture',
    TITLE_DESCRIPTION:
      'You can select photo from one of this emoji or add your own photo as profile picture',
    ADD_PHOTO_BUTTON: 'Add Custom Photo',
    TITLE_DESCRIPTION_2:
      'Press the close button to select an emoji or change the added custom photo.',

    BUTTON_TEXT: 'Continue',
  },
  ADD_PREFERENCES: {
    TITLE: 'Let us know how we can help you',
    TITLE_DESCRIPTION: 'You can always change this later',
    BUTTON_TEXT: 'Continue',
  },
  ADD_INTERESTS: {
    TITLE: 'Time to customize your interests',
    BUTTON_TEXT: 'Continue',
  },
  ADD_GENDER: {
    TITLE: 'Which one are you?',
    MALE: 'Male',
    FEMALE: 'Female',
    DESCRIPTION: 'To give you a better experience we need to know your gender',
    BUTTON_TEXT: 'Continue',
  },
  DETAILS_COMPLETED: {
    TITLE: 'You are ready to go!',
    TITLE_DESCRIPTION:
      "Thanks for taking your time to create account with us. Now this is the fun part, let's explore the app",
  },
  HOME_SCREEN: {
    TITLE: 'Good',
    DESCRIPTION:
      'Eat the right amount of food and stay hydrated throughout the day.',
    MORE_DETAILS: 'More details -',
    NUTRITION: 'Nutrition',
    WATER: 'Water',
    DAILY_STEPS: 'Daily Steps',
    CALORIES: 'cal',
    GLASSES: 'glasses',
    STEPS: 'steps',
    detailsString: (
      value: string | number,
      totalValue: string | number,
      category: string,
    ) => `${value} ${category} / ${totalValue} ${category}`,
  },
  SETTINGS: {
    TITLE: 'Settings',
  },
  APP_NAVIGATOR: {
    BACK: 'Back',
  },
  WATER_INTAKE: {
    TITLE: (glasses: number | string) =>
      `You drank ${glasses} glasses of today`,
    WARNING_MESSAGE: "You didn't drink enough water for today",
  },
  DAILY_STEPS: {
    TITLE: {
      1: 'You walked',
      2: 'steps today',
    },
  },
  COMMUNITY: {
    TITLE: 'Community',
  },
  ADD_POST: {
    TITLE: 'Create a Post',
    CAPTION: 'Add a Caption',
  },
  ADD_Comment: {
    TITLE: 'Create Comment',
  },
  CUSTOM_HOME_DETAILS_CARD: {
    BUTTON_TEXT_WARNING: 'Warning',
    BUTTON_TEXT_SAFE: 'On',
    BUTTON_TEXT_COMPLETED: 'Achieved',
  },
  ADD_FIRST_NAME: {
    TITLE: 'What is your First Name ?',
    BUTTON_TEXT: 'Continue',
    TEXT_INPUT_PLACE_HOLDER: 'First Name',
  },
  ADD_LAST_NAME: {
    TITLE: 'What is your Last Name ?',
    BUTTON_TEXT: 'Continue',
    TEXT_INPUT_PLACE_HOLDER: 'Last Name',
  },
  NUTRITION: {
    TITLE: {
      1: 'You burned',
      2: 'calories today',
    },
    NUTRITION_STATS: {
      PROTEIN: 'Protein',
      CARB: 'Carb',
      FAT: 'Fat',
    },
  },
};

import AppleHealthKit, {HealthKitPermissions} from 'react-native-health';
import {Meal} from '../Redux/Reducers/dailyMeal';
import {INTERESTS} from './icons';
import {Scopes} from 'react-native-google-fit';

export const preferencesData = [
  {title: 'Weight Loss', selected: false},
  {title: 'Better sleeping habit', selected: false},
  {title: 'Track my nutrition', selected: false},
  {title: 'Improve overall fitness', selected: false},
];

// iOS health kit permissions
export const AppleHealthPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
    ],
    write: [],
  },
} as HealthKitPermissions;

// android permissions
export const AndroidGoogleFitPermissions = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_ACTIVITY_WRITE,
    Scopes.FITNESS_BODY_READ,
  ],
};

const iconSizeInterests = {
  width: 35,
  height: 35,
};
export const INTERESETS = [
  {
    title: 'Fashion',
    icon: INTERESTS.Fashion(iconSizeInterests),
    selected: false,
  },
  {
    title: 'Organic',
    icon: INTERESTS.Organic(iconSizeInterests),
    selected: false,
  },
  {
    title: 'Meditation',
    icon: INTERESTS.Meditation(iconSizeInterests),
    selected: false,
  },
  {
    title: 'Fitness',
    icon: INTERESTS.Fitness(iconSizeInterests),
    selected: false,
  },
  {
    title: 'Smoke Free',
    icon: INTERESTS.SmokeFree(iconSizeInterests),
    selected: false,
  },
  {title: 'Sleep', icon: INTERESTS.Sleep(iconSizeInterests), selected: false},
  {title: 'Health', icon: INTERESTS.Health(iconSizeInterests), selected: false},
  {
    title: 'Running',
    icon: INTERESTS.Running(iconSizeInterests),
    selected: false,
  },
  {title: 'Vegan', icon: INTERESTS.Vegan(iconSizeInterests), selected: false},
];

export const cleanText = (inputText: string) => {
  return inputText
    .trim() // Remove leading and trailing whitespace from the entire string
    .split('\n') // Split the text into lines
    .map(line => line.trim()) // Trim each line
    .filter(line => line !== '') // Remove empty lines
    .map(line => line.replace(/\s+/g, ' ')) // Replace multiple spaces with a single space in each line
    .join('\n') // Join the lines back together with a single newline
    .replace(/''/g, '||'); // Replace '' with ||
};

export const foodData: Array<Omit<Meal, 'id'>> = [
  {
    name: 'Apple',
    carbs: 25,
    fat: 0.3,
    protein: 0.5,
    calories: 95,
    serving_size_g: 182,
  },
  {
    name: 'Banana',
    carbs: 27,
    fat: 0.3,
    protein: 1.3,
    calories: 105,
    serving_size_g: 118,
  },
  {
    name: 'Chicken Breast',
    carbs: 0,
    fat: 3.6,
    protein: 31,
    calories: 165,
    serving_size_g: 100,
  },
  {
    name: 'Broccoli',
    carbs: 6,
    fat: 0.3,
    protein: 2.6,
    calories: 55,
    serving_size_g: 91,
  },
  {
    name: 'Almonds',
    carbs: 6,
    fat: 14,
    protein: 6,
    calories: 164,
    serving_size_g: 28,
  },
  {
    name: 'Salmon',
    carbs: 0,
    fat: 13,
    protein: 20,
    calories: 208,
    serving_size_g: 100,
  },
  {
    name: 'Oatmeal',
    carbs: 27,
    fat: 3,
    protein: 5,
    calories: 154,
    serving_size_g: 40,
  },
  {
    name: 'Egg',
    carbs: 1.1,
    fat: 5,
    protein: 6,
    calories: 78,
    serving_size_g: 50,
  },
  {
    name: 'Greek Yogurt',
    carbs: 4,
    fat: 0.4,
    protein: 10,
    calories: 59,
    serving_size_g: 170,
  },
  {
    name: 'Avocado',
    carbs: 12,
    fat: 15,
    protein: 2,
    calories: 160,
    serving_size_g: 150,
  },
  {
    name: 'Sweet Potato',
    carbs: 27,
    fat: 0.1,
    protein: 2,
    calories: 112,
    serving_size_g: 130,
  },
  {
    name: 'Brown Rice',
    carbs: 45,
    fat: 1.5,
    protein: 5,
    calories: 216,
    serving_size_g: 195,
  },
  {
    name: 'Quinoa',
    carbs: 39,
    fat: 3.5,
    protein: 8,
    calories: 222,
    serving_size_g: 185,
  },
  {
    name: 'Whole Wheat Bread',
    carbs: 12,
    fat: 1,
    protein: 3,
    calories: 69,
    serving_size_g: 28,
  },
  {
    name: 'Black Beans',
    carbs: 40,
    fat: 0.9,
    protein: 14,
    calories: 227,
    serving_size_g: 172,
  },
  {
    name: 'Lentils',
    carbs: 40,
    fat: 0.8,
    protein: 18,
    calories: 230,
    serving_size_g: 198,
  },
  {
    name: 'Pasta',
    carbs: 31,
    fat: 1.3,
    protein: 6,
    calories: 157,
    serving_size_g: 100,
  },
  {
    name: 'Corn',
    carbs: 19,
    fat: 1.5,
    protein: 3.2,
    calories: 86,
    serving_size_g: 100,
  },
  {
    name: 'Potato',
    carbs: 17,
    fat: 0.1,
    protein: 2,
    calories: 77,
    serving_size_g: 100,
  },
  {
    name: 'White Rice',
    carbs: 28,
    fat: 0.3,
    protein: 2.7,
    calories: 130,
    serving_size_g: 100,
  },
  {
    name: 'Barley',
    carbs: 44,
    fat: 0.4,
    protein: 4.4,
    calories: 193,
    serving_size_g: 157,
  },
  {
    name: 'Chickpeas',
    carbs: 27,
    fat: 2.6,
    protein: 14.5,
    calories: 164,
    serving_size_g: 100,
  },
  {
    name: 'Peas',
    carbs: 14,
    fat: 0.4,
    protein: 5.4,
    calories: 81,
    serving_size_g: 100,
  },
  {
    name: 'Butternut Squash',
    carbs: 12,
    fat: 0.1,
    protein: 1,
    calories: 45,
    serving_size_g: 100,
  },
  {
    name: 'Pumpkin',
    carbs: 7,
    fat: 0.1,
    protein: 1,
    calories: 26,
    serving_size_g: 100,
  },
  {
    name: 'Dates',
    carbs: 75,
    fat: 0.2,
    protein: 2,
    calories: 282,
    serving_size_g: 100,
  },
  {
    name: 'Honey',
    carbs: 82,
    fat: 0,
    protein: 0.3,
    calories: 304,
    serving_size_g: 100,
  },
  {
    name: 'Raisins',
    carbs: 79,
    fat: 0.5,
    protein: 3.1,
    calories: 299,
    serving_size_g: 100,
  },
  {
    name: 'Mango',
    carbs: 15,
    fat: 0.4,
    protein: 0.8,
    calories: 60,
    serving_size_g: 100,
  },
  {
    name: 'Carrots',
    carbs: 10,
    fat: 0.2,
    protein: 0.9,
    calories: 41,
    serving_size_g: 100,
  },
  {
    name: 'Beets',
    carbs: 10,
    fat: 0.2,
    protein: 1.6,
    calories: 43,
    serving_size_g: 100,
  },
  {
    name: 'Couscous',
    carbs: 23,
    fat: 0.2,
    protein: 3.8,
    calories: 112,
    serving_size_g: 100,
  },
  {
    name: 'Kidney Beans',
    carbs: 22,
    fat: 0.5,
    protein: 8.7,
    calories: 127,
    serving_size_g: 100,
  },
];

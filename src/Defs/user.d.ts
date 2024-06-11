export type User = {
  id: string | null;
  firstName: string;
  lastName: string;
  email: string;
  finger: boolean;
  photo: string;
  gender: "male" | "female" | null;
  preferences: Array<{ title: string; selected: boolean }>;
  interests: Array<string>;
};
export type HealthData = {
  nutrition: number;
  todaysSteps: number;
  waterIntake: number;
  hasPermission: boolean;
  goal: {
    totalCalorie: number;
    noOfGlasses: number;
    totalSteps: number;
  };
  currentDate: string;
};

export type Post = {
  photo: string;
  caption: string;
  createdOn: Timestamp;
  userId: string;
  userName: string;
  userPhoto: string;
  likedByUsersId: Array<string>;
  comments: Array<Comment>;
  postId?: string;
};

export type Comment = {
  userName: string;
  userPhoto: string;
  comment: string;
  createdOn: Timestamp;
};

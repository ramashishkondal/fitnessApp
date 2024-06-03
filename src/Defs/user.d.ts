export type User = {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  finger: boolean | null;
  photo: string | null;
  gender: "male" | "female" | null;
  preferences: Array<{ title: string; selected: boolean }> | null;
  interests: Array<string> | null;
};

export type ChangeUserInfoProps = {
  setModalFalse: () => void;
  delayed?: {
    isDelayed: boolean;
    delayedValues: {
      photo: string;
      firstName: string;
      lastName: string;
      email: string;
      interests: {
        title: string;
        selected: boolean;
      }[];
      preferences: {
        title: string;
        selected: boolean;
      }[];
      gender: 'male' | 'female' | null;
      id: string | null;
    } | null;
    delayedSetter: React.Dispatch<
      React.SetStateAction<{
        photo: string;
        firstName: string;
        lastName: string;
        email: string;
        interests: {
          title: string;
          selected: boolean;
        }[];
        preferences: {
          title: string;
          selected: boolean;
        }[];
        gender: 'male' | 'female' | null;
        id: string | null;
      } | null>
    >;
  };
};

export type UserPostProps = {
  postData: {
    timeSincePostedInMillis: number;
    caption: string;
    photo: string;
    noOfLikes: string | number;
    noOfComments: string | number;
    isLiked: boolean;
    id: string;
  };
  userId: string;
  handleCommentsPress: () => void;
  handleLikesPress: () => void;
  handlePhotoPress?: () => void;
  showDelete?: boolean;
};

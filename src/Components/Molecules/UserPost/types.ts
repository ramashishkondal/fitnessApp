export type UserPostProps = {
  postData: {
    userPhoto: string;
    userName: string;
    timeSincePostedInMillis: number;
    caption: string;
    photo: string;
    noOfLikes: string | number;
    noOfComments: string | number;
    isLiked: boolean;
    id: string;
  };
  handleCommentsPress: () => void;
  handleLikesPress: () => void;
};

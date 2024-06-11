export type UserPostProps = {
  postData: {
    userPhoto: string;
    userName: string;
    postedOn: string;
    caption: string;
    photo: string;
    noOfLikes: string | number;
    noOfComments: string | number;
    isLiked: boolean;
    id: string;
  };
  handleCommentsPress: () => void;
  handleLikesPress: () => void;
  goToPostScreen: () => void;
};

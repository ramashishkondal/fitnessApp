import { MutableRefObject } from "react";

export type AllPostsProps = {
  goToPostScreen: (postId: string) => () => void;
  postIdRef: MutableRefObject<string | undefined>;
};

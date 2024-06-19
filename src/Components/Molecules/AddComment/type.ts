import { Dispatch, SetStateAction } from "react";
import { Post } from "../../../Defs";

export type AddCommentProps = {
  postId: Post;
  setModalFalse: () => void;
};

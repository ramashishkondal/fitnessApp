import { Dispatch, SetStateAction } from "react";

export type AddCommentProps = {
  postId: string;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};

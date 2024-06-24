import {MutableRefObject} from 'react';
import {Post} from '../../../Defs';

export type AllPostsProps = {
  goToPostScreen: (postId: string) => () => void;
  postIdRef: MutableRefObject<Post | undefined>;
  handleCommentPress: (val: boolean) => void;
};

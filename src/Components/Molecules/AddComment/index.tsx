// libs
import React, {useState} from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';

import EmojiSelector from 'react-native-emoji-selector';
import {Timestamp} from '@react-native-firebase/firestore';

// custom
import {useAppSelector} from '../../../Redux/Store';
import CustomButton from '../../Atoms/CustomButton';
import {COLORS, ICONS, SIZES, STRING} from '../../../Constants';
import {storePostComment} from '../../../Utils/userUtils';
import {AddCommentProps} from './type';
import {styles} from './styles';
import {CustomImage, HeadingText} from '../../Atoms';

const AddComment: React.FC<AddCommentProps> = ({setModalFalse, postId}) => {
  // state use
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmojiShown, setIsEmojiShown] = useState(false);

  // redux use
  const {id: userId, photo: userPhoto} = useAppSelector(
    state => state.User.data,
  );

  // functions
  const handlePost = async () => {
    if (comment.trim() === '') {
      return;
    }
    try {
      if (userId !== null) {
        setIsLoading(true);

        if (postId.postId) {
          if (postId.userId === userId!) {
            await storePostComment(postId.postId, {
              userId,
              comment,
              createdOn: Timestamp.fromDate(new Date()),
            });
          } else {
            await storePostComment(
              postId.postId,
              {
                userId,
                comment,
                createdOn: Timestamp.fromDate(new Date()),
              },
              {
                sendNotificationToUserId: postId.userId,
              },
            );
          }
        }
        setModalFalse();
      }
    } catch (e) {
      console.log('error', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.parent}
      onPress={() => setIsEmojiShown(false)}
      activeOpacity={1}>
      <View>
        <HeadingText
          text={STRING.ADD_Comment.TITLE}
          textStyle={styles.titleText}
        />
        <View style={styles.addCommentCtr}>
          <CustomImage
            source={{uri: userPhoto}}
            parentStyle={styles.customImageParent}
            imageStyle={styles.customImage}
          />
          <TextInput
            value={comment}
            autoFocus
            maxLength={100}
            onChangeText={setComment}
            placeholder="Add a Comment"
            style={styles.textInput}
            placeholderTextColor={COLORS.PRIMARY.DARK_GREY}
            onPress={() => setIsEmojiShown(false)}
            multiline
          />
        </View>
      </View>
      {isEmojiShown ? (
        <View style={styles.EmojiSelectorCtr}>
          <EmojiSelector
            onEmojiSelected={emoji => {
              setComment(comment + emoji);
            }}
            showTabs={false}
            showSectionTitles
            columns={8}
            theme={COLORS.SECONDARY.GREY}
          />
        </View>
      ) : null}
      <View style={styles.footerCtr}>
        <View style={styles.childFooterCtr}>
          <TouchableOpacity
            style={styles.iconsCtr}
            onPress={() => setIsEmojiShown(!isEmojiShown)}>
            {ICONS.SmileyGood({
              width: 24,
              height: 24,
              color: COLORS.SECONDARY.GREY,
            })}
          </TouchableOpacity>
        </View>
        <View style={styles.customButtonCtr}>
          <CustomButton
            title="Post"
            parentStyle={styles.buttonParentStyle}
            textStyle={{fontSize: SIZES.font13}}
            onPress={handlePost}
            isLoading={isLoading}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AddComment;

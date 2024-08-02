// libs
import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Pressable,
  Platform,
} from 'react-native';

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
import {useNetInfo} from '@react-native-community/netinfo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AddComment: React.FC<AddCommentProps> = ({setModalFalse, postId}) => {
  // state use
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmojiShown, setIsEmojiShown] = useState(false);
  const netInfo = useNetInfo();

  // redux use
  const {id: userId, photo: userPhoto} = useAppSelector(
    state => state.User.data,
  );

  // functions
  const handlePost = async () => {
    if (comment.trim() === '') {
      Alert.alert('Error', 'Empty comment');
      return;
    }
    if (!netInfo.isConnected) {
      Alert.alert(
        'Network Error',
        'You have to be connected to internet to comment on a post',
      );
      return;
    }
    try {
      if (userId !== null) {
        setIsLoading(true);

        if (postId.postId) {
          if (postId.userId === userId) {
            await storePostComment(postId.postId, {
              userId,
              comment: comment.replace(/\s+/g, ' '),
              createdOn: Timestamp.fromDate(new Date()),
            });
          } else {
            await storePostComment(
              postId.postId,
              {
                userId,
                comment: comment.replace(/\s+/g, ' '),
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
    <>
      <Pressable
        style={styles.parentPressable}
        onPress={() => setIsEmojiShown(false)}>
        <KeyboardAwareScrollView
          style={styles.parent}
          // extraHeight={160}
          extraScrollHeight={Platform.OS === 'ios' ? 160 : -100}
          enableOnAndroid={true}>
          <View>
            <HeadingText
              text={STRING.ADD_Comment.TITLE}
              textStyle={styles.titleText}
            />
            <View style={styles.addPostCtr}>
              <CustomImage
                source={{uri: userPhoto}}
                parentStyle={styles.customImageParent}
                imageStyle={styles.customImage}
              />
              <View style={styles.textInputCtr}>
                <TextInput
                  value={comment}
                  maxLength={100}
                  onChangeText={setComment}
                  placeholder="Add a Comment"
                  style={styles.textInput}
                  multiline
                  scrollEnabled={false}
                  placeholderTextColor={COLORS.SECONDARY.LIGHT_GREY}
                  onPress={() => setIsEmojiShown(false)}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>

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
      </Pressable>
    </>
  );
};

export default AddComment;

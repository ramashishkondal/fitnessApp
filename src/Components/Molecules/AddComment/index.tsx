// libs
import React, {useState} from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';

// custom
import {useAppSelector} from '../../../Redux/Store';
import CustomButton from '../../Atoms/CustomButton';
import {COLORS, ICONS, SIZES, STRING} from '../../../Constants';
import {storePostComment} from '../../../Utils/userUtils';
import {AddCommentProps} from './type';
import {styles} from './styles';
import {CustomImage, HeadingText} from '../../Atoms';
import {Timestamp} from '@react-native-firebase/firestore';

const AddComment: React.FC<AddCommentProps> = ({setModalFalse, postId}) => {
  // state use
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // redux use
  const {id: userId, photo: userPhoto} = useAppSelector(
    state => state.User.data,
  );

  // functions
  const handlePost = async () => {
    try {
      if (userId !== null) {
        setIsLoading(true);
        if (postId.postId) {
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
        setModalFalse();
      }
    } catch (e) {
      console.log('error', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.parent}>
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
            autoFocus
            maxLength={100}
            onChangeText={setComment}
            placeholder="Add a Comment"
            style={styles.textInput}
          />
        </View>
      </View>
      <View style={styles.footerCtr}>
        <View style={styles.childFooterCtr}>
          <TouchableOpacity style={styles.iconsCtr}>
            {ICONS.SmileyGood({
              width: 24,
              height: 24,
              color: COLORS.SECONDARY.GREY,
            })}
          </TouchableOpacity>
        </View>
        <CustomButton
          title="Post"
          parentStyle={styles.buttonParentStyle}
          textStyle={{fontSize: SIZES.font13}}
          onPress={handlePost}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

export default AddComment;

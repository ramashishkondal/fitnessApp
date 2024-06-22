// libs
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

// 3rd party libs
import {Timestamp} from '@react-native-firebase/firestore';

// custom
import {useAppSelector} from '../../../Redux/Store';
import CustomButton from '../../Atoms/CustomButton';
import {COLORS, ICONS, SIZES, STRING} from '../../../Constants';
import {sendNotification, storePostComment} from '../../../Utils/userUtils';
import {AddCommentProps} from './type';
import {styles} from './styles';
import {CustomImage, HeadingText} from '../../Atoms';

const AddComment: React.FC<AddCommentProps> = ({setModalFalse, postId}) => {
  // state use
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // redux use
  const {
    id: userId,
    photo: userPhoto,
    firstName,
    lastName,
  } = useAppSelector(state => state.User.data);

  // functions
  const handlePost = async () => {
    try {
      if (userId !== null) {
        setIsLoading(true);
        if (postId.postId) {
          await storePostComment(postId.postId, {
            userName: firstName + ' ' + lastName,
            userPhoto,
            comment,
            createdOn: Timestamp.fromDate(new Date()),
          });
          await sendNotification(
            {
              createdOn: Timestamp.fromDate(new Date()),
              message: 'commented on your post',
              userName: firstName + ' ' + lastName,
              userPhoto,
              isUnread: true,
              isShownViaPushNotification: false,
            },
            postId.userId,
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
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 24,
            marginVertical: 32,
          }}>
          <CustomImage
            source={{uri: userPhoto}}
            parentStyle={{width: 50, height: 50}}
            imageStyle={{borderRadius: 200}}
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

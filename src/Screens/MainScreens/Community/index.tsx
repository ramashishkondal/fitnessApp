// libs
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, TouchableOpacity, View, FlatList} from 'react-native';

// 3rd party
import {useAppSelector} from '../../../Redux/Store';
import firestore from '@react-native-firebase/firestore';

// custom
import {
  AddComment,
  AddPost,
  AddStory,
  AllPosts,
  HeadingText,
  SelectCustomPhoto,
  Story,
  WithModal,
} from '../../../Components';
import {COLORS, ICONS, STRING} from '../../../Constants';
import {CommunityProps} from '../../../Defs/navigators';
import {StoryData, firebaseDB, storeStory} from '../../../Utils/userUtils';
import {styles} from './styles';
import {Post} from '../../../Defs';

const postSignSize = {
  width: 20,
  height: 20,
};

const Community: React.FC<CommunityProps> = ({navigation}) => {
  // state use
  const [storyModalVisible, setStoryModalVisible] = useState(false);
  const [activeModal, setActiveModal] = useState('none');
  // const [story, setStory] = useState<string>('');
  const [storiesData, setStoriesData] = useState<StoryData[]>([]);

  // redux use
  const {firstName, lastName, photo, id} = useAppSelector(
    state => state.User.data,
  );

  // ref use
  const postIdRef = useRef<Post>();
  const story = useRef<string>('');

  // effect use
  useEffect(() => {
    const unsubscribe = firestore()
      .collection(firebaseDB.collections.stories)
      .onSnapshot(snapshot => {
        const data = snapshot.docs;
        const x = data.map(val => val.data()) as StoryData[];
        setStoriesData(x);
      });
    return () => unsubscribe();
  }, []);

  // functions
  const goToPostScreen = (postId: string) => {
    return () => navigation.navigate('PostScreen', {postId: postId});
  };
  const setStory = (st: string) => (story.current = st);
  const setActiveModalPost = () => setActiveModal('story');
  const setActiveModalFalse = () => setActiveModal('none');
  const showCommentModal = () => setActiveModal('comment');

  return (
    <>
      <ScrollView style={styles.parent} showsVerticalScrollIndicator={false}>
        <View style={styles.titleCtr}>
          <HeadingText
            text={STRING.COMMUNITY.TITLE}
            textStyle={styles.titleText}
          />
          <TouchableOpacity onPress={setActiveModalPost} style={styles.iconCtr}>
            {ICONS.PostSign(postSignSize)}
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AddStory setModalVisible={() => setStoryModalVisible(true)} />
          <FlatList
            data={storiesData}
            renderItem={({index}) => (
              <Story index={index} allStoryData={storiesData} />
            )}
            horizontal
            style={{marginVertical: 24}}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <AllPosts
          goToPostScreen={goToPostScreen}
          postIdRef={postIdRef}
          handleCommentPress={showCommentModal}
        />
        <WithModal
          modalVisible={activeModal !== 'none'}
          setModalFalse={setActiveModalFalse}>
          {activeModal === 'story' ? (
            <AddPost setModalFalse={setActiveModalFalse} />
          ) : (
            <AddComment
              setModalFalse={setActiveModalFalse}
              postId={postIdRef.current!}
            />
          )}
        </WithModal>
      </ScrollView>
      <SelectCustomPhoto
        modalVisible={storyModalVisible}
        setModalVisible={setStoryModalVisible}
        setPhoto={setStory}
        parentStyle={{backgroundColor: COLORS.PRIMARY.DARK_GREY}}
        BottomSheetModalStyle={{backgroundColor: COLORS.PRIMARY.DARK_GREY}}
        mediaType="mixed"
        onSuccess={(uri, type) => {
          storeStory(
            {
              storyUrl: uri,
              userName: firstName + ' ' + lastName,
              userPhoto: photo,
              storyType: type!,
            },
            id!,
          );
        }}
      />
    </>
  );
};

export default Community;

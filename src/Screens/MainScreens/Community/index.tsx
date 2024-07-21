// libs
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ScrollView, TouchableOpacity, View, FlatList} from 'react-native';

// 3rd party
import {useAppSelector} from '../../../Redux/Store';
import firestore, {Timestamp} from '@react-native-firebase/firestore';

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
import {ICONS, STRING} from '../../../Constants';
import {CommunityProps} from '../../../Defs/navigators';
import {StoryData, firebaseDB, storeStory} from '../../../Utils/userUtils';
import {styles} from './styles';
import {Post} from '../../../Defs';
import {useNetInfo} from '@react-native-community/netinfo';
import {useObject, useRealm} from '@realm/react';
import {StoryDb} from '../../../DbModels/story';
import {UpdateMode} from 'realm';

const postSignSize = {
  width: 20,
  height: 20,
};

const Community: React.FC<CommunityProps> = ({navigation}) => {
  // state use
  const [storyModalVisible, setStoryModalVisible] = useState(false);
  const [activeModal, setActiveModal] = useState('none');
  const [isLoadingStory, setIsLoadingStory] = useState<boolean>(false);

  const [storiesData, setStoriesData] = useState<StoryData[]>([]);

  // redux use
  const {firstName, lastName, photo, id, storiesWatched} = useAppSelector(
    state => state.User.data,
  );

  // net info use
  const netInfo = useNetInfo();

  // realm use
  const realm = useRealm();
  const storyDataFromOffline = useObject(StoryDb, id ?? '');

  // ref use
  const postIdRef = useRef<Post>();
  const story = useRef<string>('');

  // effect use
  useEffect(() => {
    const unsubscribe = firestore()
      .collection(firebaseDB.collections.stories)
      .orderBy('latestStoryOn', 'desc')
      .onSnapshot(snapshot => {
        const data = snapshot.docs;
        const x = data.map(val => val.data()) as StoryData[];

        // setting storise data based on if the story is watched by user or not.
        setStoriesData(
          x
            .filter(
              val =>
                !storiesWatched.includes(
                  val.storyByUserId +
                    ' ' +
                    Timestamp.fromMillis(val.latestStoryOn.seconds * 1000)
                      .toDate()
                      .toISOString(),
                ) &&
                val.stories.filter(z => {
                  const dd = new Date(z.storyCreatedOn);
                  const now = new Date();

                  // Calculate the difference in milliseconds between now and dd
                  const timeDiff = now.getTime() - dd.getTime();

                  // Convert 24 hours to milliseconds
                  const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

                  // Check if the time difference is greater than or equal to 24 hours
                  if (timeDiff >= twentyFourHoursInMs) {
                    return false;
                  }

                  return true;
                }).length,
            )
            .concat(
              x.filter(
                val =>
                  storiesWatched.includes(
                    val.storyByUserId +
                      ' ' +
                      Timestamp.fromMillis(val.latestStoryOn.seconds * 1000)
                        .toDate()
                        .toISOString(),
                  ) &&
                  val.stories.filter(z => {
                    const dd = new Date(z.storyCreatedOn);
                    const now = new Date();

                    // Calculate the difference in milliseconds between now and dd
                    const timeDiff = now.getTime() - dd.getTime();

                    // Convert 24 hours to milliseconds
                    const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

                    // Check if the time difference is greater than or equal to 24 hours
                    if (timeDiff >= twentyFourHoursInMs) {
                      return false;
                    }

                    return true;
                  }).length,
              ),
            ),
        );
      });
    return () => unsubscribe();
  }, [storiesWatched]);

  // functions
  const goToPostScreen = useCallback(
    (postId: string) => {
      return () => navigation.navigate('PostScreen', {postId: postId});
    },
    [navigation],
  );

  const storeStoryDataInRealmDb = (storyType: string, storyUrl: string) => {
    if (storyDataFromOffline?.stories.some(val => val.storyUrl === storyUrl)) {
      console.log('already exists in db');
      return;
    }
    console.log('adding this ', storyType, storyUrl);
    realm.write(() => {
      if (storyDataFromOffline) {
        storyDataFromOffline?.stories.push({
          storyType,
          storyUrl,
          storyCreatedOn: new Date().toISOString(),
        });
        return;
      }
      realm.create(
        StoryDb,
        {
          latestStoryOn: new Date(),
          userName: firstName + ' ' + lastName,
          storyByUserId: id!,
          userPhoto: photo,
          stories: [
            {storyType, storyUrl, storyCreatedOn: new Date().toISOString()},
          ],
        },
        UpdateMode.Modified,
      );
    });
  };

  const setStory = (st: string) => (story.current = st);
  const setActiveModalPost = useCallback(() => setActiveModal('story'), []);
  const setActiveModalFalse = useCallback(() => setActiveModal('none'), []);
  const showCommentModal = useCallback(() => setActiveModal('comment'), []);

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
        <View style={styles.storiesCtr}>
          <AddStory
            setModalVisible={() => {
              setStoryModalVisible(true);
            }}
            isLoading={netInfo.isConnected ? isLoadingStory : false}
          />

          <FlatList
            data={storiesData}
            renderItem={({index}) => (
              <Story index={index} allStoryData={storiesData} />
            )}
            horizontal
            style={styles.flatList}
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
        parentStyle={styles.selectCustomPhoto}
        BottomSheetModalStyle={styles.selectCustomPhoto}
        mediaType="mixed"
        onSuccess={(uri, type) => {
          if (netInfo.isConnected) {
            setIsLoadingStory(true);
            storeStory(
              {
                storyUrl: uri,
                userName: firstName + ' ' + lastName,
                userPhoto: photo,
                storyType: type!,
              },
              id!,
            ).finally(() => {
              setIsLoadingStory(false);
            });
          } else {
            console.log('storing data in offline mode');
            storeStoryDataInRealmDb(type!, uri);
          }
        }}
      />
    </>
  );
};

export default Community;

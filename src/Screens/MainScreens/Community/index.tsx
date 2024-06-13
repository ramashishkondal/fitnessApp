// libs
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";

// 3rd party
import firestore from "@react-native-firebase/firestore";

// custom
import {
  AddPost,
  AllPosts,
  SelectCustomPhoto,
  Story,
  WithModal,
} from "../../../Components";
import { COLORS, ICONS, STRING } from "../../../Constants";
import { CommunityProps } from "../../../Defs/navigators";
import { styles } from "./styles";
import { StoryData, firebaseDB, storeStory } from "../../../Utils/userUtils";
import { useAppSelector } from "../../../Redux/Store";

const postSignSize = {
  width: 20,
  height: 20,
};

const Community: React.FC<CommunityProps> = ({ navigation }) => {
  // state use
  const [postModalVisible, setPostModalVisible] = useState(false);
  const [storyModalVisible, setStoryModalVisible] = useState(false);
  const [story, setStory] = useState<string>();
  const [storiesData, setStoriesData] = useState<StoryData[]>([]);

  // redux use
  const { firstName, lastName, photo } = useAppSelector(
    (state) => state.User.data
  );

  // ref use
  const postIdRef = useRef<string>();

  // effect use
  useEffect(() => {
    if (story) {
      storeStory({
        storyUrl: story,
        userName: firstName + " " + lastName,
        userPhoto: photo,
      });
    }
  }, [story]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(firebaseDB.collections.stories)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs;
        const x = data.map((val) => val.data()) as StoryData[];
        setStoriesData(x);
      });
    return () => unsubscribe();
  }, []);

  // functions
  const goToPostScreen = (postId: string) => {
    return () => navigation.navigate("PostScreen", { postId: postId });
  };
  const handleAddStory = () => setPostModalVisible(true);

  return (
    <>
      <ScrollView style={styles.parent} showsVerticalScrollIndicator={false}>
        <View style={styles.titleCtr}>
          <Text style={styles.titleText}>{STRING.COMMUNITY.TITLE}</Text>
          <TouchableOpacity onPress={handleAddStory} style={styles.iconCtr}>
            {ICONS.PostSign(postSignSize)}
          </TouchableOpacity>
        </View>
        <WithModal
          modalVisible={postModalVisible}
          setModalVisible={setPostModalVisible}
        >
          <AddPost setModalVisible={setPostModalVisible} />
        </WithModal>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Story
              photo={
                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQA3gMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDB//EABsQAQEBAAIDAAAAAAAAAAAAAAABESExQWGB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APYlXEwAWcAAAFRTACqgESqAFAEwxQEwilBKGGAGGKCBhgCFgAB9Bo7OAAFAAAAAAAAAAACkARQEAAAATo00CgAgANCgAAAAAAAAAAAAAACCggqABpegEoAIAAIDcUAAAAABQEAAAAAAABAAC0qaBTQAEAAQCgA3FAAAAAAAAAAEBRDQANBPK1ABABUAAABFQBIAOioAoAAAAACAABaBqABaIAAACKACAAAAgAJb6B0WGkoCocgYqHILUKAFQtABAVAADQA4EAFQAAAQAAAQAdCAC6agC6miA1qIAAAAgAAAAAAAAAGggAAIAADYaAAAAAAgKgAQwAAAAAAQFQwBUAAADSiAAA2gARQAKAIAAAAigCACpQBQAAAEADyAAgAJQB//2Q=="
              }
              onPress={() => setStoryModalVisible(true)}
            />
            <TouchableOpacity
              style={{ position: "absolute" }}
              onPress={() => {
                setStoryModalVisible(true);
                console.log(storyModalVisible);
              }}
            >
              {ICONS.Plus({
                width: 20,
                height: 20,
                color: COLORS.SECONDARY.ORANGE,
              })}
            </TouchableOpacity>
          </View>
          <FlatList
            data={storiesData}
            renderItem={({ item }) => <Story photo={item.userPhoto} />}
            horizontal
            style={{ marginVertical: 24 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <AllPosts goToPostScreen={goToPostScreen} postIdRef={postIdRef} />
      </ScrollView>
      <SelectCustomPhoto
        modalVisible={storyModalVisible}
        setModalVisible={setStoryModalVisible}
        setPhoto={setStory}
        parentStyle={{ backgroundColor: COLORS.PRIMARY.DARK_GREY }}
        BottomSheetModalStyle={{ backgroundColor: COLORS.PRIMARY.DARK_GREY }}
        mediaType="mixed"
      />
    </>
  );
};

export default Community;

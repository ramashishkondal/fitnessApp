// libs
import React from "react";
import { Text, View } from "react-native";

// 3rd party
import auth from "@react-native-firebase/auth";

// custom
import { styles } from "./styles";
import { STRING } from "../../../Constants";
import SettingsCard from "../../../Components/Molecules/SettingsCard";

const Settings = () => {
  return (
    <View style={styles.parent}>
      <Text style={styles.titleText}>{STRING.SETTINGS.TITLE}</Text>
      <View style={{ marginTop: 40 }}>
        <SettingsCard
          title="Edit Profile"
          onPress={() => console.log("eida")}
        />
        <SettingsCard title="Push Notification" hasSwitch />
        <SettingsCard title="Give Feedback" />
        <SettingsCard title="About Us" />
        <SettingsCard title="Log Out" onPress={() => auth().signOut()} />
      </View>
    </View>
  );
};

export default Settings;

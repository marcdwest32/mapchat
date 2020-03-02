import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Button, Title, TextInput, Switch, Divider } from "react-native-paper";
import { updateUser, getAll } from "../Helper";

export default function UserProfileScreen({ screenProps }) {
  const username = screenProps.username;
  const [newUsername, setNewUsername] = useState("");
  const [nameFirst, setNameFirst] = useState("");
  const [nameLast, setNameLast] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState("");
  const [profilePrivate, setProfilePrivate] = useState(false);
  const clearFields = () => {
    setNewUsername("");
    setNameFirst("");
    setNameLast("");
    setStatus("");
    setBio("");
  };

  const saveChanges = () => {
    const user = {
      username: newUsername,
      name_first: nameFirst,
      name_last: nameLast,
      bio: bio,
      status: status,
      public: profilePrivate,
      id: screenProps.user.id
    };

    updateUser(user)
      .then(({ data }) => {
        console.log(data, "updateUser userProfileScreen.js");
      })
      .catch(err => {
        console.log(err);
      });
    console.log(
      `User - ${newUsername}, Name - ${nameFirst} ${nameLast}, Status - ${status}, Bio - ${bio}`
    );
    clearFields();
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={styles.container}
      keyboardVerticalOffset={80}
    >
      <SafeAreaView>
        <ScrollView>
          <Title>{username}</Title>
          <View>
            <TextInput
              label="Change Username"
              placeholder="username"
              mode="outlined"
              value={newUsername}
              theme={{
                colors: {
                  primary: "#003489"
                }
              }}
              onChangeText={newUsername => setNewUsername(newUsername)}
            />
            <TextInput
              label="First Name"
              placeholder="first name"
              mode="outlined"
              value={nameFirst}
              theme={{
                colors: {
                  primary: "#003489"
                }
              }}
              onChangeText={nameFirst => setNameFirst(nameFirst)}
            />
            <TextInput
              label="Last Name"
              placeholder="last name"
              mode="outlined"
              value={nameLast}
              theme={{
                colors: {
                  primary: "#003489"
                }
              }}
              onChangeText={nameLast => setNameLast(nameLast)}
            />

            <TextInput
              label="Bio"
              placeholder="bio"
              mode="outlined"
              multiline={true}
              numberOfLines={6}
              value={bio}
              theme={{
                colors: {
                  primary: "#003489"
                }
              }}
              onChangeText={bio => setBio(bio)}
            />
            <TextInput
              label="Status"
              placeholder="status"
              mode="outlined"
              value={status}
              theme={{
                colors: {
                  primary: "#003489"
                }
              }}
              onChangeText={status => setStatus(status)}
            />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Title style={{ padding: 5 }}>Make Profile Private</Title>
              <Switch
                color="#D7B377"
                value={profilePrivate}
                style={{ justifyContent: "flex-end" }}
                onValueChange={() => setProfilePrivate(!profilePrivate)}
              />
            </View>
            <Divider />
            <Button
              icon="content-save"
              mode="contained"
              color="#385F71"
              style={{
                margin: 10,
                height: 50
              }}
              onPress={() => saveChanges()}
            >
              Save Changes
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    padding: 20,
    backgroundColor: "#fff"
  },
  baseText: {
    color: "#D7B377",
    fontSize: 20,
    fontWeight: "bold"
  }
});

UserProfileScreen.navigationOptions = {
  title: "Edit Profile",
  headerTintColor: "#D7B377",
  headerStyle: {
    backgroundColor: "#2B4162"
  },
  headerRight: <Text style={styles.baseText}> MapChat </Text>
};

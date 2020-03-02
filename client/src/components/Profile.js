import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Snackbar,
  Text
} from "react-native-paper";

const Profile = props => {
  const { toggleProfileModal, post } = props;
  const { user } = post;
  const initials = user.name_first[0] + user.name_last[0];

  const [sendRequest, toggleSendRequest] = useState(false);
  const [buttonOn, toggleButtonOn] = useState(true);

  const addUser = () => {
    //todo
    toggleProfileModal(false);
    toggleSendRequest(true);
    toggleButtonOn(false);
    console.log(`sent friend request to ${user.username}. ProfileJS addUser`);
  };

  return (
    <Card style={styles.container}>
      <View>
        <KeyboardAvoidingView behavior="position" enabled>
          <Card>
            <Card.Title
              title={user.username}
              subtitle={user.email}
              left={() => (
                <Avatar.Text size={48} label={initials} style={styles.avatar} />
              )}
            />
            <Divider />
            <Card.Content style={{ paddingTop: 10 }}>
              <Text
                style={{ paddingBottom: 7, fontWeight: "bold", fontSize: 16 }}
              >
                Status: {user.status}
              </Text>
              <Divider />
              <Text
                style={{
                  paddingTop: 7,
                  paddingBottom: 7,
                  fontWeight: "bold",
                  fontSize: 16
                }}
              >
                Bio: {user.bio}
              </Text>
              <Divider />
              {buttonOn && (
                <Button
                  icon="account-plus"
                  mode="contained"
                  style={{
                    marginTop: 10,
                    marginRight: 220,
                    height: 40,
                    width: 150
                  }}
                  color="#385F71"
                  onPress={() => addUser()}
                >
                  Add Friend
                </Button>
              )}
              <Snackbar
                visible={sendRequest}
                onDismiss={() => toggleSendRequest(false)}
                duration={1000}
              >
                Friend Request sent to {user.username}
              </Snackbar>
            </Card.Content>
          </Card>
        </KeyboardAvoidingView>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    paddingBottom: 10,
    backgroundColor: "#D7B377"
  },
  avatar: { backgroundColor: "#385F71" }
});

export default Profile;

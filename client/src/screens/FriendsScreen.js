import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView
} from "react-native";
import { Avatar, Card, Divider, Text } from "react-native-paper";

const FriendsScreen = ({ screenProps }) => {
  const { user } = screenProps;

  friends = [
    {
      bio: "Orphaned mutant cyclops space pilot",
      email: "oneBigI@gmail.com",
      id: 2,
      name_first: "Turanga",
      name_last: "Leela",
      status: "Flying Planet Express Ship",
      username: "CaptainLeela"
    },
    {
      bio: "Cryogenically frozen delivery boy",
      email: "luckyFry@gmail.com",
      id: 3,
      name_first: "Philip J.",
      name_last: "Fry",
      status: "Drinking beer in my underpants",
      username: "UnfrozenFry"
    },
    {
      bio: "Precocious little scamp",
      email: "BBRodriguez@gmail.com",
      id: 4,
      name_first: "Bender B.",
      name_last: "Rodriguez",
      status: "Bite my shiny metal ass",
      username: "BenderIsGreat"
    },
    {
      bio: "I live in the dumpster",
      email: "DrZ@gmail.com",
      id: 5,
      name_first: "John",
      name_last: "Zoidberg",
      status: "Why not Zoidberg?",
      username: "LobsterMan"
    },
    {
      bio: "I still have a few doomsday devices lying around for a rainy day",
      email: "ProfessorFreaksworth@gmail.com",
      id: 6,
      name_first: "Hubert",
      name_last: "Farnsworth",
      status: "Good news everyone!",
      username: "Professor"
    }
  ];

  return (
    <ScrollView>
      {friends &&
        friends.map(friend => {
          const initials = friend.name_first[0] + friend.name_last[0];
          return (
            <Card style={styles.container} key={friend.id}>
              <View>
                <KeyboardAvoidingView behavior="position" enabled>
                  <Card style={{ backgroundColor: "#F5F0F6" }}>
                    <Card.Title
                      title={`${friend.name_first} ${friend.name_last}`}
                      subtitle={friend.email}
                      left={() => (
                        <Avatar.Text
                          size={48}
                          label={initials}
                          style={styles.avatar}
                        />
                      )}
                    />
                    <Divider />
                    <Card.Content style={{ paddingTop: 10 }}>
                      <Text
                        style={{
                          paddingBottom: 7,
                          fontWeight: "bold",
                          fontSize: 16
                        }}
                      >
                        Status: {friend.status}
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
                        Bio: {friend.bio}
                      </Text>
                      <Divider />
                    </Card.Content>
                  </Card>
                </KeyboardAvoidingView>
              </View>
            </Card>
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    paddingBottom: 10,
    backgroundColor: "#385F71"
  },
  avatar: { backgroundColor: "#D7B377" },
  baseText: {
    color: "#D7B377",
    fontSize: 20,
    fontWeight: "bold"
  }
});

FriendsScreen.navigationOptions = {
  title: "Friends",
  headerTintColor: "#D7B377",
  headerStyle: {
    backgroundColor: "#2B4162"
  },
  headerRight: <Text style={styles.baseText}> MapChat </Text>
};

export default FriendsScreen;

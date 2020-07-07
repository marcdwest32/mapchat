import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { Avatar, Card, Divider, Text } from 'react-native-paper';

const FriendsScreen = ({ screenProps }) => {
  const { user } = screenProps;

  friends = [
    {
      bio:
        'Quasar encyclopaedia galactica cosmic fugue astonishment worldlets Neque porro quisquam est.',
      email: 'consequatur@quasi.com',
      id: 2,
      name_first: 'Quid',
      name_last: 'Dolorem',
      status: 'Quis autem vel eum iure reprehenderit',
      username: 'consequatur',
    },
    {
      bio:
        'Parturient posuere natoque vestibulum mi maecenas sollicitudin etiam sociis senectus.',
      email: 'hendrerit@sociosqu.com',
      id: 3,
      name_first: 'Risus',
      name_last: 'Cursus',
      status: 'Aptent rutrum, nisi vivamus lobortis porta!',
      username: 'RisusCursus',
    },
    {
      bio:
        'Sit at mauris dolor ipsum faucibus fringilla tempus, tempus senectus.',
      email: 'Urna@sociis.com',
      id: 4,
      name_first: 'Conubia',
      name_last: 'Egestas',
      status:
        'Ullamcorper iaculis, ipsum adipiscing. Malesuada porta mollis mattis sem varius nunc viverra condimentum fringilla natoque.',
      username: 'ConubiaEgestas',
    },
    {
      bio:
        'Natoque mattis habitasse, sagittis feugiat a volutpat sollicitudin. Primis aptent inceptos ligula class convallis fermentum orci hac curabitur consectetur.',
      email: 'jilliantish@gmail.com',
      id: 5,
      name_first: 'Magna',
      name_last: 'Integer',
      status:
        'Cras ac viverra convallis auctor risus volutpat senectus magna integer auctor vel porttitor.',
      username: 'MagnaInteger',
    },
  ];

  return (
    <ScrollView>
      {friends &&
        friends.map(friend => {
          const initials = friend.name_first[0] + friend.name_last[0];
          return (
            <Card style={styles.container} key={friend.id}>
              <View>
                <KeyboardAvoidingView behavior='position' enabled>
                  <Card style={{ backgroundColor: '#F5F0F6' }}>
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
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}
                      >
                        Status: {friend.status}
                      </Text>
                      <Divider />
                      <Text
                        style={{
                          paddingTop: 7,
                          paddingBottom: 7,
                          fontWeight: 'bold',
                          fontSize: 16,
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
    backgroundColor: '#385F71',
  },
  avatar: { backgroundColor: '#D7B377' },
  baseText: {
    color: '#D7B377',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

FriendsScreen.navigationOptions = {
  title: 'Friends',
  headerTintColor: '#D7B377',
  headerStyle: {
    backgroundColor: '#2B4162',
  },
  headerRight: <Text style={styles.baseText}> MapChat </Text>,
};

export default FriendsScreen;

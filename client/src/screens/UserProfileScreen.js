import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Title, TextInput, Switch, Divider } from 'react-native-paper';
import { postUser } from '../Helper';

export default function UserProfileScreen({ screenProps }) {
  console.log(screenProps, 'user profile');
  const username = screenProps.username;
  const [newUsername, setNewUsername] = useState('');
  const [nameFirst, setNameFirst] = useState('');
  const [nameLast, setNameLast] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [status, setStatus] = useState('');
  const [password, setPassword] = useState('');
  const [profilePrivate, setProfilePrivate] = useState(false);

  const clearFields = () => {
    setNewUsername('');
    setNameFirst('');
    setNameLast('');
    setEmail('');
    setStatus('');
    setBio('');
    setPassword('');
  };

  const saveChanges = () => {
    const user = {
      username: newUsername,
        name_first: nameFirst,
        name_last: nameLast,
        password: password,
        email: email,
        bio: bio,
        status: status,
        public: profilePrivate,}
    postUser(user).then(({data})=>{
      console.log(data);
    })
    console.log(
      `User - ${newUsername}, Name - ${nameFirst} ${nameLast}, Email - ${email}, Status - ${status}, Bio - ${bio}, Password - ${password}`,
    );
    clearFields();
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* <SafeAreaView style={styles.container}> */}
      <ScrollView>
        <Title>{username}</Title>
        <View>
          <TextInput
            label='Change Username'
            placeholder='username'
            mode='outlined'
            value={newUsername}
            onChangeText={newUsername => setNewUsername(newUsername)}
          />
          <TextInput
            label='First Name'
            placeholder='first name'
            mode='outlined'
            value={nameFirst}
            onChangeText={nameFirst => setNameFirst(nameFirst)}
          />
          <TextInput
            label='Last Name'
            placeholder='last name'
            mode='outlined'
            value={nameLast}
            onChangeText={nameLast => setNameLast(nameLast)}
          />
          <TextInput
            label='Email'
            placeholder='email'
            mode='outlined'
            value={email}
            onChangeText={email => setEmail(email)}
          />
          <TextInput
            label='Bio'
            placeholder='bio'
            mode='outlined'
            multiline={true}
            numberOfLines={6}
            value={bio}
            onChangeText={bio => setBio(bio)}
          />
          <TextInput
            label='Status'
            placeholder='status'
            mode='outlined'
            value={status}
            onChangeText={status => setStatus(status)}
          />
          <TextInput
            label='Password'
            placeholder='password'
            mode='outlined'
            value={password}
            onChangeText={password => setPassword(password)}
          />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Title style={{ padding: 5 }}>Make Profile Private</Title>
            <Switch
              value={profilePrivate}
              style={{ justifyContent: 'flex-end' }}
              onValueChange={() => setProfilePrivate(!profilePrivate)}
            />
          </View>
          <Divider />
          <Button
            icon='content-save'
            mode='contained'
            style={{
              margin: 10,
              height: 50,
            }}
            onPress={() => saveChanges()}
          >
            Save Changes
          </Button>
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </KeyboardAvoidingView>
  );
}

UserProfileScreen.navigationOptions = {
  title: 'Edit Profile',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    padding: 20,
    backgroundColor: '#fff',
  },
});

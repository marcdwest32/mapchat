import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, us } from 'react-native';
import { Button, Title, TextInput, Switch, Divider } from 'react-native-paper';
import { postMessageHelper } from '../Helper';
import { useNavigation, useNavigationParam, useFocusEffect } from 'react-navigation-hooks'
// import { useFocusEffect } from '@react-navigation/native';



export default function NewPostScreen({ screenProps }) {
  
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  
  let longitudeParam = useNavigationParam('longitude');
  let latitudeParam = useNavigationParam('latitude');
  console.log('paul this is the thing', longitudeParam)
  const [otherLocation, setOtherLocation] = useState(false);

  if(longitudeParam){
    setOtherLocation(true);
  } 

  const username = screenProps.username;
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [anon, setAnon] = useState(false);
  const [global, setGlobal] = useState(false);
  const [comments, setComments] = useState(true);
  // useFocusEffect(useCallback(() => {
  //   console.log(longitudeParam)
  //   //component did mount
  //   console.debug("screen takes focus");
  //   //component did unmount
  //   return () => {
  //     longitudeParam = null;
  //     latitudeParam = null;
  //     // setOtherLocation(false);
  //     console.debug("screen loses focus")};
  // }, []));

  const clearFields = () => {
    setTitle('');
    setLocation('');
    setMessage('');
  };

  const postMessage = () => {
    console.log(global, "global")
    let postInput = {title, message, anon, global, comments};
    let userId = 1;
    //todo hardcoded, fix after create profile screen
    const { latitude, longitude } = screenProps.location.coords;
    let toPass = {
      longitude,
      latitude
    }
    if (otherLocation){
      toPass.longitude = longitudeParam
      toPass.latitude = latitudeParam
    }
    postMessageHelper(postInput, toPass, userId)
    .then((res)=>{
      // console.log(res, 'message posted successfully')
    })
    console.log(
      `User - ${username}, Title - ${title}, Location - ${location}, Message - ${message}`,
    );

    clearFields();
  };

  return (
    <ScrollView style={styles.container}>
      <Title>{username}</Title>
      <View>
        <TextInput
          label='Title'
          placeholder='title'
          mode='outlined'
          value={title}
          onChangeText={title => setTitle(title)}
        />
        <TextInput
          label={otherLocation ? 'Clicked Location':'Current Location'}
          placeholder='location'
          mode='outlined'
          value={location}
          onChangeText={location => setLocation(location)}
        />
        <TextInput
          label='Message'
          placeholder='message'
          mode='outlined'
          multiline={true}
          numberOfLines={6}
          value={message}
          onChangeText={message => setMessage(message)}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Title style={{ padding: 5 }}>Anonymous</Title>
          <Switch
            value={anon}
            style={{ justifyContent: 'flex-end' }}
            onValueChange={() => setAnon(!anon)}
          />
        </View>
        <Divider />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Title style={{ padding: 5 }}>Global</Title>
          <Switch
            value={global}
            style={{ justifyContent: 'flex-end' }}
            onValueChange={() => setGlobal(!global)}
          />
        </View>
        <Divider />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Title style={{ padding: 5 }}>Comments On</Title>
          <Switch
            value={comments}
            style={{ justifyContent: 'flex-end' }}
            onValueChange={() => setComments(!comments)}
          />
        </View>
        <Divider />
        <Button
          icon='send'
          mode='contained'
          style={{
            margin: 10,
            height: 50,
          }}
          onPress={() => postMessage()}
        >
          Drop Message
        </Button>
      </View>
    </ScrollView>
  );
}

NewPostScreen.navigationOptions = {
  title: 'New Post',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    padding: 20,
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

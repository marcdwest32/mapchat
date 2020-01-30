import React, { useState } from 'react';
import MapView, { Marker, View, Overlay } from 'react-native-maps';
import {
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import PreviewList from '../components/PreviewList';
import { getAll } from '../Helper';

export default function MapScreen({ screenProps }) {
  const [messages, setMessages] = useState([]);
  getAll()
    .then(({ data }) => {
      const allMessages = data.map(message => {
        message.longitude = parseFloat(message.coordinate.long);
        message.latitude = parseFloat(message.coordinate.lat);
        return message;
      });
      setMessages(allMessages);
    })
    .catch(err => console.log(err));
  const { latitude, longitude } = screenProps.location.coords;
  const region = {
    latitude,
    longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

  const [dropMarker, setDropMarker] = useState({});
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <MapView
          style={styles.mapStyle}
          initialRegion={region}
          showsUserLocation={true}
          userTrackingMode={true}
          onPress={event => setDropMarker(event.nativeEvent.coordinate)}
        >
          {dropMarker.latitude !== undefined &&
            dropMarker.longitude !== undefined && (
              <Marker
                coordinate={{
                  latitude: dropMarker.latitude,
                  longitude: dropMarker.longitude,
                }}
                key={dropMarker.key}
                onPress={() =>
                  console.log(
                    `Leave a message at latitude ${dropMarker.latitude} and longitude ${dropMarker.longitude}?`,
                  )
                }
              >
                <Image
                  source={require('../assets/images/message.png')}
                  style={{ height: 45, width: 35 }}
                />
              </Marker>
            )}
          {messages.map((message, i) => {
            return (
              <MapView.Marker
                coordinate={{
                  latitude: message.latitude,
                  longitude: message.longitude,
                }}
                key={i}
                onPress={() =>
                  console.log(
                    `You are at latitude ${message.latitude} and longitude ${message.longitude}`,
                  )
                }
              />
            );
          })}
        </MapView>
        {/* <SlidingUpPanel> */}
        <Overlay style={{ flex: 1, top: 500 }}>
          <PreviewList />
        </Overlay>
        {/* </SlidingUpPanel> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

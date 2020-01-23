import React, { useState } from 'react';
import MapView, { Marker, View } from 'react-native-maps';
import { StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function MapScreen({ screenProps }) {
  const { latitude, longitude } = screenProps.coords;
  const region = {
    latitude,
    longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

  const messages = [
    { latitude: 29.971426, longitude: -90.072672, key: 1 },
    { latitude: 29.965022, longitude: -90.072675, key: 2 },
    { latitude: 29.967577, longitude: -90.070677, key: 3 },
  ];

  const [dropMarker, setDropMarker] = useState({});
  return (
    <ScrollView style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={region}
        showsUserLocation={true}
        userTrackingMode={true}
        onPress={event => setDropMarker(event.nativeEvent.coordinate)}
      >
        <MapView.Marker
          coordinate={{
            latitude: dropMarker.latitude,
            longitude: dropMarker.longitude,
          }}
          key={dropMarker.key}
          onPress={() =>
            console.log(
              `You are at latitude ${dropMarker.latitude} and longitude ${dropMarker.longitude}`,
            )
          }
        />
        {messages.map(message => {
          return (
            <MapView.Marker
              coordinate={{
                latitude: message.latitude,
                longitude: message.longitude,
              }}
              key={message.key}
              onPress={() =>
                console.log(
                  `You are at latitude ${message.latitude} and longitude ${message.longitude}`,
                )
              }
            />
          );
        })}
      </MapView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

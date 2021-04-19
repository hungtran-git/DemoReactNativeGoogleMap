import React from 'react'
// import { View, StyleSheet, Section } from 'react-native'
import { View, Text, Image, ScrollView, TextInput, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

const ExploreScreen = () => {
    return (
        <MapView provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={
                {
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121
                }
            }
            > 
                {/* <Marker
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324, 
                    }}
                    image={require('../assets/map_marker.png')}
                    title="Test title"
                    description="This is description"
                >

                </Marker> */}
        </MapView>
    )
}
export default ExploreScreen;
const styles = StyleSheet.create({
    map:{
        height: "100%"
    },
    bubble:{

    }
});
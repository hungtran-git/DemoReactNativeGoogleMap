import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import axios from 'axios';

const YOUR_API_KEY = 'AIzaSyAREMO25DxDH1539AwQbGEpfVtz8tKPRpk'

const App = () => {
  const [listLocation, setListLocation] = useState([]);

  useEffect(async () => {

    /*
    tmpListLocation.push({
      latitude: 10.792726187581362,
      longitude: 106.67262236931352,
    });
    tmpListLocation.push({
      latitude: 10.792726187581362,
      longitude: 106.67262236931352,
    });
    tmpListLocation.push({
      latitude: 8,
      longitude: 108,
    });
    */
   try{
    await getListCoffeeLocation();
   }catch(e){
    console.log(e);
   }
  }, [])

  const getListCoffeeLocation = async ()=>{
    let nextPageToken = '';
    let tmpListLocation = [];
    const parameters = {
      query: 'cafe+coffee',
      location: '10.784607034554545,106.68336657773979',
      radius: '500'
    }
    let parameterString = '';
    for (const param in parameters) {
      parameterString += `${param}=${parameters[param]}&`;
    }

    const googleTextSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?${parameterString}key=${YOUR_API_KEY}`;
    let searchResponse = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=cafe+coffee&location=10.784607034554545,106.68336657773979&radius=500&key=AIzaSyAREMO25DxDH1539AwQbGEpfVtz8tKPRpk');
    console.log(searchResponse);
    if (searchResponse && searchResponse.status == 200) {
      tmpListLocation = [...searchResponse.data.results];
      nextPageToken = searchResponse.data.next_page_token;
    }

    while (nextPageToken) {
      const nextPageUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${nextPageToken}&key=${YOUR_API_KEY}`;
      let nextResultRes = await axios.get(nextPageUrl)
      if (nextResultRes && nextResultRes.status == 200) {
        tmpListLocation = [...tmpListLocation, ...nextResultRes.data.results];
        nextPageToken = nextResultRes.data.next_page_token;
      }
      nextPageToken = nextPageToken ? nextPageToken : '';
    }
    setListLocation([...tmpListLocation]);
    console.log(tmpListLocation);
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 10.784607034554545,
          longitude: 106.68336657773979,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {listLocation.map((_, idx) => {
          return <Marker
          key={idx}
            coordinate={{
              latitude: _.geometry.location.lat,
              longitude:_.geometry.location.lng
            }}
            title={_.name}
            description={_.formatted_address}
          >
          </Marker>
        }
        )}
        {/* <Marker
          coordinate={{
            latitude: 10.792726187581362,
            longitude: 106.67262236931352,
          }}
          title="Test title"
          description="This is description"
        >
        </Marker> */}
      </MapView>

    </View>
  );
}
export default App;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
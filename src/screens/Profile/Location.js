import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapboxGL, { Logger } from '@rnmapbox/maps';
import { MAPBOX_API_KEY } from '../../constant';
import Geolocation from '@react-native-community/geolocation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

Logger.setLogCallback(log => {
  const { message } = log;

  if (
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error: Socket Closed')
  ) {
    return true;
  }
  return false;
})

MapboxGL.setAccessToken(MAPBOX_API_KEY);
// MapboxGL.setConnected(true);
MapboxGL.setTelemetryEnabled(false);
// MapboxGL.setWellKnownTileServer('Mapbox');



const Location = () => {
  const [routeDirection, setRouteDirection] = useState(null)
  const [coords, setCoords] = useState([12.534744, 50.373783])
  const [destinationcoords, setDestinationCoords] = useState([12.534744, 50.373783])
  const [distance, setdistance] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords)
        setCoords([position.coords.longitude, position.coords.latitude])
        setDestinationCoords([72.846619, 19.187327])
      },
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
      }
    );
  }, []);

  function makeRouterFeature(coordinates) {
    let routerFeature = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates,
          },
        },
      ],
    };
    return routerFeature;
  }

  async function createRouterLine(params) {
    const startCoords = `${coords[0]},${coords[1]}`
    console.log('my location ->', startCoords);
    const endCoords = `72.846619,19.187327`
    const geometries = 'geojson';
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${startCoords};${endCoords}?alternatives=true&geometries=${geometries}&steps=true&banner_instructions=true&overview=full&voice_instructions=true&access_token=${MAPBOX_API_KEY}`;

    try {
      let response = await fetch(url)
      let json = await response.json()
      const data = json.routes.map((data) => {
        console.log('my data', data);
        setdistance(data.distance)
        setDuration(data.duration)
      });
      let coordinates = json['routes'][0]['geometry']['coordinates'];

      if (coordinates.length) {
        const routerFeature = makeRouterFeature([...coordinates]);
        setRouteDirection(routerFeature);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#33495F', position: 'absolute', top: 10, right: 10, zIndex: 5, width: 150,borderRadius:10,padding:10,borderColor:'black',borderWidth:1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginBottom:5 }}>
          <MaterialIcons name={'location-on'} color={"red"} size={30} />
          <Text style={{color:"white"}}>{(distance/1000).toFixed(1)} km</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <MaterialIcons name={'access-time'} color={"#37b828"} size={30} />
          <Text style={{color:'white'}}>{(duration/60).toFixed(1)} min</Text>
        </View>
      </View>
      <MapboxGL.MapView
        style={styles.map}
        zoomEnabled={true}
        styleURL="mapbox://styles/mapbox/navigation-night-v1"
        rotateEnabled={true}
        onDidFinishLoadingMap={async () => {
          await createRouterLine(coords);
        }}>
        <MapboxGL.Camera
          zoomLevel={13}
          centerCoordinate={[72.846619, 19.187327]}
          animationMode={'flyTo'}
          animationDuration={6000}
        />
        {routeDirection && (
          <MapboxGL.ShapeSource id="line1" shape={routeDirection}>
            <MapboxGL.LineLayer
              id="routerLine01"
              style={{
                lineColor: '#37b828',
                lineWidth: 4,
              }}
            />
          </MapboxGL.ShapeSource>
        )}
        <MapboxGL.PointAnnotation
          id='destinationRoute'
          coordinate={destinationcoords}
        >
          <View style={styles.destinationIcon}>
            <MaterialIcons name={'location-on'} color={"red"} size={40} />
          </View>
        </MapboxGL.PointAnnotation>
        <MapboxGL.UserLocation
          animated={true}
          androidRenderMode={'gps'}
          showsUserHeadingIndicator={true}
        />
      </MapboxGL.MapView>
    </View>
  );
}

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  destinationIcon: {
    // width: 30,
    // height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
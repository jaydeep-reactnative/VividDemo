//imports
import React, {useState, useEffect} from 'react';
import {Box, Button, VStack} from 'native-base';
import Geolocation from '@react-native-community/geolocation';
import {Platform, PermissionsAndroid} from 'react-native';
import {setLatLong} from '../../store/weatherSlice';
import {useAppDispatch} from '../../store/hook';

// HomeScreen functional component
export const HomeScreen = ({navigation}) => {
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [locationStatus, setLocationStatus] = useState('');
  const dispatch = useAppDispatch();

  // Get location permissions from user
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
  }, []);

  const getOneTimeLocation = async () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setLocationStatus('Permission granted');
        //getting the Longitude from the location json
        const currentLongitude1 = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude1 = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude1);
        //Setting Longitude state
        setCurrentLatitude(currentLatitude1);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const navigateToCurrentWeatherScreen = () => {
    getOneTimeLocation();
    dispatch(setLatLong(`${currentLatitude},${currentLongitude}`));
    navigation.navigate('CurrentWeather');
  };

  return (
    <Box
      justifyContent={'center'}
      alignItems={'center'}
      flex={1}
      backgroundColor={'black.100'}>
      <VStack space={10} width={200}>
        <Button
          onPress={navigateToCurrentWeatherScreen}
          size={'lg'}
          variant={'subtle'}>
          Current Weather
        </Button>
        <Button
          onPress={() => navigation.navigate('SearchWeather')}
          size={'lg'}
          variant={'subtle'}>
          Search Location
        </Button>
      </VStack>
    </Box>
  );
};

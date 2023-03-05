// imports
import {
  Box,
  Heading,
  Stack,
  Text,
  PresenceTransition,
  Spinner,
} from 'native-base';
import React, {useState, useEffect, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hook';
import {fetchCurrentWeatherDetails} from '../../store/weatherSlice';
import Geolocation from '@react-native-community/geolocation';
import {styles} from './styles';

// CurrentWeatherScreen functional component
export const CurrentWeatherScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {currentLocationWeather, isLoading} = useAppSelector(
    state => state.weather,
  );
  const dispatch = useAppDispatch();
  const {name} = currentLocationWeather || {};
  const {country} = currentLocationWeather?.sys || {};
  const {gust} = currentLocationWeather?.wind || {};
  const {temp, feels_like, humidity, pressure} =
    currentLocationWeather?.main || {};

  const getOneTimeLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        //getting the Longitude from the location json
        const currentLongitude = position.coords.longitude;
        //getting the Latitude from the location json
        const currentLatitude = position.coords.latitude;
        // Fetch weather details API call
        dispatch(
          fetchCurrentWeatherDetails({
            lat: currentLatitude,
            long: currentLongitude,
          }),
        );
      },
      error => {
        console.log(JSON.stringify(error.message));
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  }, [dispatch]);

  useEffect(() => {
    setIsOpen(true);
    return () => {
      setIsOpen(false);
    };
  }, []);

  useEffect(() => {
    getOneTimeLocation();
  }, [getOneTimeLocation]);

  return (
    <PresenceTransition
      visible={isOpen}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 2,
        transition: {
          duration: 1000,
        },
      }}>
      {isLoading ? (
        <Spinner size="lg" h={'100%'} alignSelf={'center'} />
      ) : (
        <Box style={styles.container}>
          <Box style={styles.card}>
            <Stack p={4} space={3}>
              <Text style={styles.name}>{name}</Text>
              <Heading size="md">{`${country}`}</Heading>
              <Text style={styles.text}>
                {`Temprature C: ${temp}\nFeels like C: ${feels_like}\nHumadity: ${humidity}\nGust/mph: ${gust}\nPressure: ${pressure}\n`}
              </Text>
            </Stack>
          </Box>
        </Box>
      )}
    </PresenceTransition>
  );
};

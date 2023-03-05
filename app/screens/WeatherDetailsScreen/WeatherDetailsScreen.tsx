// imports
import {Box, Heading, Stack, Text, PresenceTransition} from 'native-base';
import React, {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hook';
import {fetchCurrentWeatherDetails} from '../../store/weatherSlice';
import {styles} from './styles';

// WeatherDetailsScreen functional component
export const WeatherDetailsScreen = ({route}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {currentLocationWeather} = useAppSelector(state => state.weather);
  const dispatch = useAppDispatch();
  const {weatherDetails} = route.params;
  const {lat, lon} = weatherDetails;

  const {name} = currentLocationWeather || {};
  const {country} = currentLocationWeather?.sys || {};
  const {gust} = currentLocationWeather?.wind || {};
  const {temp, feels_like, humidity, pressure} =
    currentLocationWeather?.main || {};

  useEffect(() => {
    setIsOpen(true);
    return () => {
      setIsOpen(false);
    };
  }, []);

  // Fetch weather details API call
  useEffect(() => {
    dispatch(fetchCurrentWeatherDetails({lat: lat, long: lon}));
  }, [dispatch, lat, lon]);

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
    </PresenceTransition>
  );
};

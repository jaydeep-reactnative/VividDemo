// imports
import React, {useState, useEffect} from 'react';
import {
  Box,
  Heading,
  Input,
  Pressable,
  SearchIcon,
  Spinner,
  Stack,
  Text,
  FlatList,
  useToast,
} from 'native-base';
import {useAppDispatch, useAppSelector} from '../../store/hook';
import {fetchLocations, addLocation} from '../../store/weatherSlice';

// SearchWeatherScreen functional component
export const SearchWeatherScreen = ({navigation}) => {
  // Fetched data from redux state
  const {isLoading} = useAppSelector(state => state.weather);
  const {searchedLocations} = useAppSelector(state => state.weather);
  const {selectedLocations} = useAppSelector(state => state.weather);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch locations from search results
    dispatch(fetchLocations(search));
  }, [dispatch, search]);

  // Toast to show selected locations
  const addLocationToList = item => {
    toast.show({
      title: `${item.name} added in the list`,
      placement: 'top',
    });
    dispatch(addLocation(item));
  };

  // Render items in Flatlist
  const renderItem = ({item}) => (
    <Box
      w="100%"
      marginBottom={2}
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="2"
      _dark={{
        borderColor: 'coolGray.600',
        backgroundColor: 'gray.700',
      }}
      _light={{
        backgroundColor: 'gray.50',
      }}>
      <Pressable
        onPress={() =>
          searchedLocations.length > 0
            ? addLocationToList(item)
            : navigation.navigate('WeatherDetails', {weatherDetails: item})
        }>
        <Stack py={3} space={3}>
          <Stack m={3} space={2}>
            <Heading size="md" ml="-1">
              {item.name}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: 'violet.500',
              }}
              _dark={{
                color: 'violet.400',
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1">
              {item.region}
            </Text>
            <Text
              fontSize="xs"
              _light={{
                color: 'violet.500',
              }}
              _dark={{
                color: 'violet.400',
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1">
              {item.country}
            </Text>
          </Stack>
        </Stack>
      </Pressable>
    </Box>
  );

  return (
    <Box m={5} flex={1}>
      <Input
        placeholder="Search Location"
        fontSize={'lg'}
        variant="filled"
        borderRadius="10"
        h={10}
        onChangeText={text => setSearch(text)}
        value={search}
        InputLeftElement={<SearchIcon ml="2" size="6" color="gray.400" />}
      />
      {isLoading ? (
        <Spinner size="lg" h={'100%'} alignSelf={'center'} />
      ) : (
        <FlatList
          mt={5}
          data={
            searchedLocations !== 400 ? searchedLocations : selectedLocations
          }
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Box>
  );
};

// imports
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {default as Store} from './store/store';
import {
  HomeScreen,
  CurrentWeatherScreen,
  SearchWeatherScreen,
  WeatherDetailsScreen,
} from './screens';

// Functional App Component
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={Store.store}>
      <NativeBaseProvider>
        <PersistGate loading={null} persistor={Store.persistor}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                name="CurrentWeather"
                component={CurrentWeatherScreen}
              />
              <Stack.Screen
                name="SearchWeather"
                component={SearchWeatherScreen}
              />
              <Stack.Screen
                name="WeatherDetails"
                component={WeatherDetailsScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;

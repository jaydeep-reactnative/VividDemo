// imports
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

interface WeatherState {
  currentLocation: string;
  currentLocationWeather: [];
  searchedLocations: [];
  selectedLocations: [];
  isLoading: boolean;
}

// Initial State
const initialState: WeatherState = {
  currentLocation: '',
  currentLocationWeather: [],
  searchedLocations: [],
  selectedLocations: [],
  isLoading: false,
};

// Fetch Breweries API call
export const fetchCurrentWeatherDetails = createAsyncThunk(
  'weather/fetchCurrentWeatherDetails',
  async ({lat, long}: {lat: number; long: number}) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=684e353fcd8a3850c4e1d6c87fc58f8f`,
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },
);

export const fetchLocations = createAsyncThunk(
  'weather/fetchLocations',
  async (location: string) => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=684e353fcd8a3850c4e1d6c87fc58f8f`,
      );
      console.log('Fetch locations: ', response.data);
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  },
);

// Created slice for Breweries
export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLatLong: (state, action: PayloadAction<string>) => {
      state.currentLocation = action.payload;
    },
    addLocation: (state, action) => {
      state.selectedLocations.push(action.payload);
    },
  },
  extraReducers: builder => {
    //Actions handle for fetch breweries api call
    builder.addCase(fetchCurrentWeatherDetails.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchCurrentWeatherDetails.fulfilled, (state, action) => {
      state.currentLocationWeather = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCurrentWeatherDetails.rejected, state => {
      state.isLoading = false;
    });

    builder.addCase(fetchLocations.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      state.searchedLocations = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchLocations.rejected, state => {
      state.isLoading = false;
    });
  },
});
export const {setLatLong, addLocation} = weatherSlice.actions;
export default weatherSlice.reducer;

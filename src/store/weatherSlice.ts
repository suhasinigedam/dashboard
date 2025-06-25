import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface WeatherState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

export type City = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  rain?: {
    "1h"?: number;
    "3h"?: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};


const cities = [
  'London',
  'New York',
  'Paris',
  'Tokyo',
  'Sydney',
  'Berlin',
  'Los Angeles',
  'Beijing',
  'Buenos Aires',
  'Moscow',
  'Cairo',
  'Rio de Janeiro',
  'Madrid',
  'Mumbai',
  'Singapore',
  'Dubai',
  'Hong Kong',
  'Johannesburg',
  'Liverpool',
  'Manchester',
  'Cancun',
  'Glasgow',
  'Rome',
  'Amsterdam',
  'Osaka',
];

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string) => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    console.log("fetching weather...");
    if (!city.trim()) {
      const responses = await Promise.all(
        cities.map((c) =>
          axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
              c
            )}&appid=${apiKey}&units=metric`
          )
        )
      );
      console.log(responses);
      return responses.map((res) => res.data);
    } else {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${apiKey}&units=metric`
      );
      console.log(response);
      return [response.data];
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather';
      });
  },
});

export default weatherSlice.reducer;

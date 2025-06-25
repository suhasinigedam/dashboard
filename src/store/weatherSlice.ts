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

    if (!city.trim()) {
      // No search input: fetch all fixed cities concurrently
      const responses = await Promise.all(
        cities.map((c) =>
          axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
              c
            )}&appid=${apiKey}&units=metric`
          )
        )
      );
      return responses.map((res) => res.data);
    } else {
      // Search input present: fetch only that city
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${apiKey}&units=metric`
      );
      return [response.data]; // Return as array for consistency
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

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_KEY = import.meta.env.VITE_API_KEY

export interface WeatherState {
  loading: boolean;
  error: string | null;
  data: {
    weather: { description: string }[];
    main: { temp: number };
  } | null;
}


// Async thunk for fetching weather details
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (date: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Chandigarh&appid=${API_KEY}&units=metric`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
    loading: false,
    error: null as unknown | null,
  },
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
        state.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;

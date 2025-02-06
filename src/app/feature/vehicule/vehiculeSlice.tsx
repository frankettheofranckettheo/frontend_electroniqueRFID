import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Vehicule {
  id: number;
  tagRfid: string;
  estConforme: boolean;
  dateDernierPassage: string;
  datePremierPassage: string;
}

interface VehiculeState {
  data: Vehicule[];
  loading: boolean;
  error: string | null;
}

// État initial
const initialState: VehiculeState = {
  data: [],
  loading: false,
  error: null,
};

// Thunk pour récupérer les données depuis l'API
export const fetchVehicules = createAsyncThunk('vehicule/fetchVehicules', async () => {
  const response = await axios.get('http://localhost:9090/api/vehicules');
  return response.data;
});

// Slice
const vehiculeSlice = createSlice({
  name: 'vehicule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicules.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchVehicules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Une erreur est survenue';
      });
  },
});

export default vehiculeSlice.reducer;

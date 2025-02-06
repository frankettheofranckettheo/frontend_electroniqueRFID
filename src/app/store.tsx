import { configureStore } from '@reduxjs/toolkit';
import vehiculeReducer from "."

const store = configureStore({
  reducer: {
    vehicule: vehiculeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

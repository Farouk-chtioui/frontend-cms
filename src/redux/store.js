import { configureStore } from '@reduxjs/toolkit';
import appLayoutReducer from './slices/appLayoutSlice';

const store = configureStore({
  reducer: {
    appLayout: appLayoutReducer,
  },
});

export default store;

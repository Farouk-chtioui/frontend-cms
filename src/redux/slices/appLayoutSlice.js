// appLayoutSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'bottomBar', // Tracks the active tab
  bottomBarTabs: [], // Store for bottom bar tabs
  appScreens: [], // Store for app screens data
  onboarding: false, // Store for onboarding status (changed to boolean for clarity)
};

const appLayoutSlice = createSlice({
  name: 'appLayout',
  initialState,
  reducers: {
    // Set the active tab
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    // Update the bottom bar tabs
    setBottomBarTabs: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.bottomBarTabs = action.payload;
      } else {
        console.error('setBottomBarTabs: Payload must be an array.');
      }
    },
    // Update app screens
    setAppScreens: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.appScreens = action.payload;
      } else {
        console.error('setAppScreens: Payload must be an array.');
      }
    },
    // Update onboarding status
    setOnboarding: (state, action) => {
      if (typeof action.payload === 'boolean') {
        state.onboarding = action.payload;
      } else {
        console.error('setOnboarding: Payload must be a boolean.');
      }
    },
    // Reset the app layout to its initial state
    resetAppLayout: (state) => {
      return initialState;
    },
  },
});

export const {
  setActiveTab,
  setBottomBarTabs,
  setAppScreens,
  setOnboarding,
  resetAppLayout,
} = appLayoutSlice.actions;

export default appLayoutSlice.reducer;

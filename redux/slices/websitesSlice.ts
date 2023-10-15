import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state as an empty array
interface WebsitesState {
  websites: Website[];
}

interface Website {
  websiteImage: string;
  websiteName: string;
  websiteDescription: string;
  websiteLink: string;
}

const initialState: WebsitesState = {
  websites: [],
};

// Create the websitesSlice
const websitesSlice = createSlice({
  name: "websites",
  initialState,
  reducers: {
    setterWebsites: (state, action: PayloadAction<Website[]>) => {
      state.websites = action.payload;
    },
    addWebsite: (state, action: PayloadAction<Website>) => {
      state.websites.push(action.payload);
    },
    removeWebsite: (state, action: PayloadAction<string>) => {
      state.websites = state.websites.filter(
        (website) => website.websiteName !== action.payload
      );
    },
    updateWebsite: (state, action: PayloadAction<Website>) => {
      const index = state.websites.findIndex(
        (website) => website.websiteName === action.payload.websiteName
      );
      if (index !== -1) {
        state.websites[index] = action.payload;
      }
    },
  },
});

// Export the action creators
export const { setterWebsites, addWebsite, removeWebsite, updateWebsite } =
  websitesSlice.actions;

// Export the reducer
export default websitesSlice.reducer;

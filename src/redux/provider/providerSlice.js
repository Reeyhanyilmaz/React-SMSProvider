import { createSlice } from "@reduxjs/toolkit";

export const providerSlice = createSlice({
  name: "provider",
  initialState: {
    partnerProviders:[],
  },
  reducers: {
      setPartnerProviders: (state, action) => {
          state.partnerProviders = action.payload;
      }    
  },
});

export const { setPartnerProviders } = providerSlice.actions;
export default providerSlice.reducer;
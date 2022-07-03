import { createSlice } from "@reduxjs/toolkit";

export const providerSlice = createSlice({
  name: "provider",
  initialState: {
    partnerProviders:[],
    providerEnums : [
      {name: "", value: 0}, 
      {name: "PostaGuvercini", value: 1} , 
      {name: "MobilDev", value: 2}, 
      {name: "JetSMS", value: 3}, 
      {name: "MailJet", value:4}, 
      {name: "Twilio", value: 5}, 
      {name: "InfoBip", value: 6}, 
      {name: "Vonage", value: 7}],
  },
  reducers: {
      setPartnerProviders: (state, action) => {
          state.partnerProviders = action.payload;
      }    
  },
});

export const { setPartnerProviders } = providerSlice.actions;
export default providerSlice.reducer;
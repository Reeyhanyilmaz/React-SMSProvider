import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import providerSlice from "./provider/providerSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        provider: providerSlice,
    },
});
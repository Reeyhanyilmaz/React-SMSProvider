import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userToken: null,
    user : {
        email : "",
        password : ""
    },
  },
  reducers: {
    setUserToken: (state, action) => {
        state.userToken = action.payload;          
    },
    setUser: (state, action) => {
        if(action.payload.type === "email"){
            state.user.email = action.payload.value;
        } else {
            state.user.password = action.payload.value;
        }
    },
  },
});

export const { setUser, setUserToken } = authSlice.actions;
export default authSlice.reducer;
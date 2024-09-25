import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Features/userSlice.mjs";

const store = configureStore({
   reducer:{
      userSlice: userSlice,
   }
})


export default store;
import statusCode from "../../statusCode.mjs";
import {createSlice} from '@reduxjs/toolkit'

const initialState = {
   data: null,
   status: statusCode.EMPTY
}


const userSlice = createSlice({
   name: "userSlice",
   initialState,
   reducers: {
      addUser : (state, action) => {
         state.data = action.payload
         state.status = statusCode.IDLE
         console.log(action.payload);
         
      },
      removeUser : (state, action) => {
         state.data = null
         state.status = statusCode.EMPTY
      },
   } 
})


export const {addUser, removeUser} = userSlice.actions
export default userSlice.reducer
import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name: "data", 
    initialState: {
        auth: false,
        projectType: 'Projects'
    },
    
    reducers: {
      addUsertoLocal: (state) => {
            if (state.auth == false) {
              state.auth = true
              console.log("ifauth==true")
            } else {
              console.log("elseauth==true")
            }
          },
      setProjectType: (state = initialState, action) => {
        state.projectType = action.payload
      }
    } 
})

export const selectIsAuth = (state) => Boolean(state.data.projectType);

export const authReducer = authSlice.reducer

export const { addUsertoLocal, setProjectType } = authSlice.actions
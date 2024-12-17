



import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    
    currentUser:null,

    loading:false,

    error:null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{

        signInUserStart:(state) => {

            state.loading = true

            state.error = null
        },

        signInUserSuccess:(state,action) => {

            state.loading = false

            state.error = null

            state.currentUser = action.payload
        },

        signInUserFailure:(state,action) => {

            state.loading = false

            state.error = action.payload
        },

        updateUserStart:(state) => {

            state.loading = true

            state.error = null

        },

        updateUserSuccess:(state,action) => {

            state.loading = false 

            state.error = null

            state.currentUser = action.payload

        },


        updateUserFailure:(state,action) => {

            state.error = action.payload

            state.loading = false
        },

        deleteUserSuccess:(state,action) => {

            state.currentUser = null

            state.loading = false

            state.error = null
        },

        deleteUserFailure:(state,action) => {

            state.error = action.payload

            state.loading = false
        },

        signOutSuccess:(state) => {

            state.currentUser = null
        }

    }
})

export const {
    signInUserStart,
    signInUserSuccess,
    signInUserFailure,
    updateUserFailure,
    updateUserSuccess,
    updateUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOutSuccess
} = userSlice.actions


export default userSlice.reducer
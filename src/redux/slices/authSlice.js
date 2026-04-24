import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uid: localStorage.getItem('auth_uid') || null,
    email: localStorage.getItem('auth_email') || null,
    displayName: localStorage.getItem('auth_displayName') || null,

    isLoading: false,
    error: null,
}

const AuthSlise= createSlice({
    name:'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action)=>{
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.displayName = action.payload.displayName;
            state.isLoading = false;
            state.error = null;
            localStorage.setItem('auth_uid', state.uid)
            localStorage.setItem('auth_email', state.email)
            localStorage.setItem('auth_display_name', state.displayName)
        },

        loginFailure: (state, action)=>{
            state.isLoading = false
            state.error = action.payload
        },

        startLoading: (state)=>{
            state.isLoading= true
            state.error = null
        },
        logoutSuccess: (state)=>{
            state.uid = null
            state.email = null
            state.displayName = null

localStorage.removeItem('auth_uid')
localStorage.removeItem('auth_email')
            localStorage.removeItem('auth_displayName')
        },
    }
})

export const {loginSuccess, loginFailure, startLoading, logoutSuccess,} = AuthSlise.actions;

export default AuthSlise.reducer
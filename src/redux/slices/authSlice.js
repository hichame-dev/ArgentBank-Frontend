import { createSlice } from '@reduxjs/toolkit'

// Chargement initial depuis localStorage
const initialState = {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {

            state.token = action.payload.token
            localStorage.setItem('token', action.payload.token)
        },
        setUser: (state, action) => {

            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        logout: (state) => {

            state.token = null
            state.user = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        },
    },
})

export const { loginSuccess, logout, setUser } = authSlice.actions
export default authSlice.reducer

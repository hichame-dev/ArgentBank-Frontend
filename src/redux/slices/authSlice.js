import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: localStorage.getItem('token') || null,
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            console.log('[authSlice] loginSuccess:', action.payload)
            state.token = action.payload.token
            localStorage.setItem('token', action.payload.token)
        },
        logout: (state) => {
            console.log('[authSlice] logout')
            state.token = null
            state.user = null
            localStorage.removeItem('token')
        },
        setUser: (state, action) => {
            console.log('[authSlice] setUser:', action.payload)
            state.user = action.payload
        },
    },
})

export const { loginSuccess, logout, setUser } = authSlice.actions
export default authSlice.reducer

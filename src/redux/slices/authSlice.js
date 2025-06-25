import { createSlice } from '@reduxjs/toolkit'

// Chargement initial depuis localStorage
const storedUser = JSON.parse(localStorage.getItem('user'))

const initialState = {
    token: localStorage.getItem('token') || null,
    user: storedUser || null,
    username: storedUser?.userName || ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token

            if (action.payload.username) {
                state.username = action.payload.username
            }

            localStorage.setItem('token', action.payload.token)
        },

        setUser: (state, action) => {
            state.user = action.payload
            state.username = action.payload.userName
            localStorage.setItem('user', JSON.stringify(action.payload))
        },

        setUsername: (state, action) => {
            state.username = action.payload
            if (state.user) {
                state.user.userName = action.payload
                localStorage.setItem('user', JSON.stringify(state.user))
            }
        },

        logout: (state) => {
            state.token = null
            state.user = null
            state.username = ''
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('username')
        },
    },
})

export const { loginSuccess, logout, setUser, setUsername } = authSlice.actions
export default authSlice.reducer

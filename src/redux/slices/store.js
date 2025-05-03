import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

console.log('[store.js] Redux store initialized')

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
})

export default store

import { createSlice } from '@reduxjs/toolkit'

const initialState =  {
    user: {},
    token: "",
    loading: false,
    errors: []
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserInfo: (state, action) => {
			console.log(action.payload)
			state.user = action.payload
		},
		setToken: (state, action) => {
			state.token = action.payload
		}
	}
})


export const { setUserInfo,setToken } = userSlice.actions
export const userReducer = userSlice.reducer
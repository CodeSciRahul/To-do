//AuthSclie to store and reterive user Information and token in local Storage

import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface loginSignupRes {
    user: {
     userName: string,
     password: string,
    } | null;
}

const storedUser = localStorage.getItem('user');

const initialState: loginSignupRes = { 
user: storedUser ? JSON.parse(storedUser) : null,
};


export const authSlice = createSlice({
    initialState,
    name: 'auth',

    reducers: {
        setUserInfo: (state, action: PayloadAction<loginSignupRes>) => {
            const { user} = action.payload
            state.user = user
            
            localStorage.setItem("user", JSON.stringify(user));

        },

        removeUserInfo: (state) => {
            state.user = null
            localStorage.removeItem('user');
        }
    }
})

export const {setUserInfo,removeUserInfo } = authSlice.actions
export default authSlice.reducer;
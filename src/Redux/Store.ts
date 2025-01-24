import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./feature/authSlice";
import todoSlice from "./feature/todoSlice"
import { themeViewSlice } from "./feature/uiSettingsSlice";
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        todo: todoSlice,
        uiSetting: themeViewSlice.reducer
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

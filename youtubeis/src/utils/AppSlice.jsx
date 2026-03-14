import { createSlice } from "@reduxjs/toolkit"
const AppSlice = createSlice({
    name: "app",
    initialState: {
        isMenuOpen: true,
        userstate: false,
        theme: "light",
    },
    reducers: {
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
        closeMenu: (state) => {
            state.isMenuOpen = false;
        },
        userbutton: (state) => {
            state.userstate = !state.userstate;
        },
        toggleTheme: (state) => {
            state.theme = (state.theme || "light").toLowerCase() === "light" ? "dark" : "light";
        }
    }
})
export const { toggleMenu, closeMenu, userbutton, toggleTheme } = AppSlice.actions;
export default AppSlice.reducer;
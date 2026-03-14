import { configureStore } from "@reduxjs/toolkit"
import AppSlice from "./AppSlice"
import SearchSlice from "./SearchSlice"
const appstore = configureStore({
    reducer: {
        app: AppSlice,
        search: SearchSlice,
    }
})
export default appstore
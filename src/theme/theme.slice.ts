import { createSlice } from '@reduxjs/toolkit'
import  { RootState} from '../store/theme.store';


export interface ThemeInterface {
    theme: "dark" | "light" 
}

const initialState: ThemeInterface = {
    theme: 'light'
}

export const ThemeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        handleTheme: (state)=>{
            if(state.theme==='light'){
                state.theme = 'dark'
            } else {
                state.theme = 'light'
            }
        }
    }
})

export const { handleTheme } = ThemeSlice.actions
export const selecTheme = (state: RootState) => state.theme.theme;
export default ThemeSlice.reducer
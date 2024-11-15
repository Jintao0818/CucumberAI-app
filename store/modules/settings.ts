import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface settingsStore {
  modeValue: string,
  characterValue: string[],
  length: number
}

const initialState: settingsStore = {
  modeValue: 'fruit',
  characterValue: [],
  length: 0

}

const settingsStore = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setModeValue(state, action: PayloadAction<string>) {
      state.modeValue = action.payload
    },
    setCharacterValue(state, action: PayloadAction<string[]>) {
      state.characterValue = action.payload
    },
    setLength(state, action: PayloadAction<number>) {
      state.length = action.payload
    },
  }
})

export const { setModeValue, setCharacterValue, setLength } = settingsStore.actions

const settingsReducer = settingsStore.reducer
export default settingsReducer
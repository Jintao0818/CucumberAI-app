import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface dataStore{
  active: string,
  downloadUrl: string,
  resultData: object
}


const initialState: dataStore = {
  active: 'home',
  downloadUrl: '',
  resultData: []
}

const dataStore = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setActive(state, action: PayloadAction<string>) {
      state.active = action.payload
    },
    setDownloadUrl(state, action: PayloadAction<string>) {
      state.downloadUrl = action.payload
    },
    setResultData(state, action: PayloadAction<object>) {
      state.resultData = action.payload
    }
  }

})

const { setActive, setDownloadUrl, setResultData } = dataStore.actions

const dataReducer = dataStore.reducer

export { setActive, setDownloadUrl, setResultData }

export default dataReducer
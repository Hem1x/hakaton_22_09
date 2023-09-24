import { createSlice } from '@reduxjs/toolkit';

export const modeSlice = createSlice({
  name: '@@mode',
  initialState: {
    mode: 'nano',
  },
  reducers: {
    setMode(state, action) {
      state.mode = action.payload;
    },
  },
});

export default modeSlice.reducer;
export const { setMode } = modeSlice.actions;

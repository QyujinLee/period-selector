import { createSlice } from '@reduxjs/toolkit';

export const periodSlice = createSlice({
  name: 'period',
  initialState: {
    beginDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    beginTime: `${new Date().getHours()}:${Math.floor(new Date().getMinutes() / 10) * 10}`,
    endTime: `${new Date().getHours()}:${Math.floor(new Date().getMinutes() / 10) * 10}`,
  },
  reducers: {
    setPeriodDate: (state, action) => {
      const { type, value } = action.payload;
      state[type] = value;
    },
    setPeriodTime: (state, action) => {
      const { type, hour, minute } = action.payload;
      state[type] = `${hour}:${minute}`;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPeriodDate, setPeriodTime } = periodSlice.actions;

export default periodSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
export const mealsSlice = createSlice({
  name: 'meals',
  initialState: [
    {
      img: "",
      name: "Peace Lily",
      cost: 14,
      quantity: 0,
  },
  {
      img: "",
      name: "Spider plant",
      cost: 15,
      quantity: 0,
  },

  ],
  reducers: {
    toggleMealSelection: (state, action) => {
        state[action.payload].selected = !state[action.payload].selected;
  },
  },
});

export const { toggleMealSelection } = mealsSlice.actions;
export default mealsSlice.reducer;
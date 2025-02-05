import { createSlice } from '@reduxjs/toolkit';
export const airPurifyingPlantsSlice = createSlice({
  name: 'airPurifyingPlant',
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
   
    incrementQuantity: (state, action) => {
      const { payload: index } = action;
      if (state[index]) {
        state[index].quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const { payload: index } = action;
      if (state[index] && state[index].quantity > 0) {
        state[index].quantity--;
      }
    },
  },
});

export const { incrementQuantity, decrementQuantity } = airPurifyingPlantsSlice.actions;

export default airPurifyingPlantsSlice.reducer;
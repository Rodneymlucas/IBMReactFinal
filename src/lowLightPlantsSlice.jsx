import { createSlice } from "@reduxjs/toolkit";

export const lowLightPlantsSlice = createSlice({
  name: "av",
  initialState: [
        {
        img: "",
        name: "Snake plant",
        cost: 10,
        quantity: 0,
    },
    {
        img: "",
        name: "ZZ plant",
        cost: 11,
        quantity: 0,
    },

  ],


  reducers: {
    incrementQuantity: (state, action) => {
        const item = state[action.payload];
        if (item) {
            item.quantity++;
        }
    },
    decrementQuantity: (state, action) => {
        const item = state[action.payload];
        if (item && item.quantity > 0) {
            item.quantity--;
        }
    },
  },
});

export const { incrementQuantity, decrementQuantity } = lowLightPlantsSlice.actions;

export default lowLightPlantsSlice.reducer;
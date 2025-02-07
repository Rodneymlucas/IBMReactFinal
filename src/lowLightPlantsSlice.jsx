import { createSlice } from "@reduxjs/toolkit";

export const lowLightPlantsSlice = createSlice({
  name: "lowLightPlant",
  initialState: [
        {
        img: "./src/assets/pexels-rosana-solis-385478-3718448.jpg",
        name: "Snake plant",
        cost: 10,
        quantity: 0,
    },
    {
        img: "./src/assets/pexels-siggy-824572.jpg",
        name: "ZZ plant",
        cost: 11,
        quantity: 0,
    },

  ],


  reducers: {
    incrementLowLightPlantsQuantity: (state, action) => {
        const item = state[action.payload];
        if (item) {
            item.quantity++;
        }
    },
    decrementLowLightPlantsQuantity: (state, action) => {
        const item = state[action.payload];
        if (item && item.quantity > 0) {
            item.quantity--;
        }
    },
  },
});

export const { incrementLowLightPlantsQuantity, decrementLowLightPlantsQuantity } = lowLightPlantsSlice.actions;

export default lowLightPlantsSlice.reducer;
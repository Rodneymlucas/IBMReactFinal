// was venueSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const succulentPlantsSlice = createSlice({
  name: "succulentPlant",
  initialState: [
    {
      img: "./src/assets/pexels-rocketmann-prod-9507073.jpg",
      name: "Aloe vera",
      cost: 12,
      quantity: 0,
    },
    {
      img: "./src/assets/pexels-kevin-malik-9032130.jpg",
      name: "Jade Plant",
      cost: 13,
      quantity: 0,
    },
  
  ],
  reducers: {
   
    incrementSucculentPlantsQuantity: (state, action) => {
      const { payload: index } = action;
      if (state[index]) {
        state[index].quantity++;
      }
    },
    decrementSucculentPlantsQuantity: (state, action) => {
      const { payload: index } = action;
      if (state[index] && state[index].quantity > 0) {
        state[index].quantity--;
      }
    },
  },
});

export const { incrementSucculentPlantsQuantity, decrementSucculentPlantsQuantity } = succulentPlantsSlice.actions;

export default succulentPlantsSlice.reducer;

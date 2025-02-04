import { configureStore } from '@reduxjs/toolkit';
import succulentPlantsReducer from './succulentPlantsReducerSlice';
import lowLightPlants from './lowLightPlantsSlice';
import airPurifyingPlantsReducer from './airPurifyingPlantsSlice';

export default configureStore({
  reducer: {
    succulentPlant: succulentPlantsReducer,
    lowLlightPlant: lowLightPlantsReducer,
    airPurifyingPlant: airPurifyingPlantsReducer,
  },
});
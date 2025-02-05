import { configureStore } from '@reduxjs/toolkit';
import succulentPlantsReducer from './succulentPlantsSlice';
import lowLightPlantsReducer from './lowLightPlantsSlice';
import airPurifyingPlantsReducer from './airPurifyingPlantsSlice';

export default configureStore({
  reducer: {
    succulentPlant: succulentPlantsReducer,
    lowLlightPlant: lowLightPlantsReducer,
    airPurifyingPlant: airPurifyingPlantsReducer,
  },
});
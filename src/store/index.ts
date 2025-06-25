import { configureStore } from "@reduxjs/toolkit";
import widgetsReducer from "./widgetsSlice";
import weatherReducer from "./weatherSlice"; 
import cryptoReducer from "./cryptoSlice";
import taskListReducer from "./taskListSlice";

export const store = configureStore({
  reducer: {
      widgets: widgetsReducer,
      weather: weatherReducer, 
      crypto: cryptoReducer,
      taskList: taskListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

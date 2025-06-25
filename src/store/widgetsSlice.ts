import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type WidgetType = "crypto" | "weather" | "tasks";

interface WidgetsState {
  activeWidget: WidgetType | null;
}

const initialState: WidgetsState = {
  activeWidget: null,
};

const widgetsSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    setActiveWidget(state, action: PayloadAction<WidgetType>) {
      state.activeWidget = action.payload;
    },
  }
})

export const { setActiveWidget } = widgetsSlice.actions;
export default widgetsSlice.reducer;

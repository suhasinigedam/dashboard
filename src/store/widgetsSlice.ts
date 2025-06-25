import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type WidgetType = "crypto" | "weather" | "tasks";

interface WidgetsState {
  activeWidget: WidgetType | null;
}

const initialState: WidgetsState = {
  activeWidget: null, // default shown widgets
};

const widgetsSlice = createSlice({
  name: "widgets",
  initialState,
  // reducers: {
  //   addWidget(state, action: PayloadAction<WidgetType>) {
  //     if (!state.activeWidget.includes(action.payload)) {
  //       state.activeWidget.push(action.payload);
  //     }
  //   },
  //   removeWidget(state, action: PayloadAction<WidgetType>) {
  //     state.activeWidget = state.activeWidget.filter(w => w !== action.payload);
  //   },
  //   reorderWidgets(state, action: PayloadAction<WidgetType[]>) {
  //     state.activeWidget = action.payload;
  //   },
  // },
  reducers: {
    setActiveWidget(state, action: PayloadAction<WidgetType>) {
      state.activeWidget = action.payload;
    },
  }
})

// export const { addWidget, removeWidget, reorderWidgets } = widgetsSlice.actions;
export const { setActiveWidget } = widgetsSlice.actions;
export default widgetsSlice.reducer;

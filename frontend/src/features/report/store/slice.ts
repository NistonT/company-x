import { createSlice } from "@reduxjs/toolkit";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../utils";

interface IReportSlice {
  startDate: string;
  endDate: string;
}

const initialState: IReportSlice = {
  startDate: getFirstDayOfMonth(),
  endDate: getLastDayOfMonth(),
};

const reportSlice = createSlice({
  name: "reportSlice",
  initialState,
  reducers: {},
});

export default reportSlice.reducer;

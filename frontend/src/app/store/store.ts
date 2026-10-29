import reportSlice from "@/features/report/store/slice";
import { baseApi } from "@/shared/api/base";
import { configureStore } from "@reduxjs/toolkit/react";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    report: reportSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

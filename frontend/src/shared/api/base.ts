import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API } from "../consts/api";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API,
  }),
  tagTypes: ["Department", "Employee"],
  endpoints: () => ({}),
});

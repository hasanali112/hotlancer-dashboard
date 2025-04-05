import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hotlancer-dashboard-server.vercel.app",
  }),
  tagTypes: ["component", "domain"],
  endpoints: () => ({}),
});

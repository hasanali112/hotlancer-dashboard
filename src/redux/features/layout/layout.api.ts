import { baseApi } from "../../api/baseApi";

const layoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLayout: builder.mutation({
      query: (data) => ({
        url: "/create-component",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["component"],
    }),
  }),
});

export const { useCreateLayoutMutation } = layoutApi;

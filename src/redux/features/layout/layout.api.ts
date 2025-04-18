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
    getAllLayout: builder.query({
      query: () => ({
        url: "/components",
        method: "GET",
      }),
      providesTags: ["component"],
    }),
    deleteLayout: builder.mutation({
      query: (id) => ({
        url: `/delete-component/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["component"],
    }),
  }),
});

export const {
  useCreateLayoutMutation,
  useGetAllLayoutQuery,
  useDeleteLayoutMutation,
} = layoutApi;

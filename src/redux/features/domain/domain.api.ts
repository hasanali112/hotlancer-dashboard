import { baseApi } from "@/redux/api/baseApi";

const domainApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDomain: builder.mutation({
      query: (data) => ({
        url: "/create-component",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["component"],
    }),
  }),
});

export const { useCreateDomainMutation } = domainApi;

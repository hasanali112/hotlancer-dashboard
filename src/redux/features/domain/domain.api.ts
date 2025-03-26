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
    getDomain: builder.query({
      query: (arg) => ({
        url: "/domains",
        method: "GET",
        params: arg,
      }),
      providesTags: ["component"],
    }),
  }),
});

export const { useCreateDomainMutation, useGetDomainQuery } = domainApi;

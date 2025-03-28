import { baseApi } from "@/redux/api/baseApi";

const domainApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDomain: builder.mutation({
      query: (data) => ({
        url: "/create-domain",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["domain"],
    }),
    getDomain: builder.query({
      query: (arg) => ({
        url: "/domains",
        method: "GET",
        params: arg,
      }),
      providesTags: ["domain"],
    }),
  }),
});

export const { useCreateDomainMutation, useGetDomainQuery } = domainApi;

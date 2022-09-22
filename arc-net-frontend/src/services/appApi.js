import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Utilize Redux, we can make queries to database
//// doing this we can avoid writing fetch() or axios() functions
const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001", // define a service using a base URL
  }),

  endpoints: (builder) => ({
    // creating the user
    // mutations are used to send data updates to the server
    signupUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),

    // login
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),

    // logout
    logoutUser: builder.mutation({
      query: (payload) => ({
        url: "/logout",
        method: "DELETE",
        body: payload,
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = appApi;

export default appApi;

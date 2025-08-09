import { apiSlice } from "../api/api";

type LoginCredentials = {
  username: string,
  password: string
}

type LoginResponse = {
  fullname: string,
  accessToken: string
} 

type RefreshResponse = {
  fullname: string,
  accessToken: string
}

type RegisterData = {
  firstname: string,
  lastname: string,
  username: string,
  password: string
}


export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/v1/login",
        method: "POST",
        body: {...credentials}
      })
    }),

    refresh: builder.mutation<RefreshResponse, void>({
      query: () => ({
        url: "/v1/refreshToken",
        method: "GET"
      })
    }),

    signup: builder.mutation<void, RegisterData>({
      query: (data) => ({
        url: "/v1/register",
        method: "POST",
        body: {...data}
      })
    }),

  })
})

export const { 
  useLoginMutation,
  useRefreshMutation,
  useSignupMutation
} = authApiSlice;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPerson } from '../types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://lovely-pear-protocol.glitch.me' }),
  tagTypes: ['Contacts'],
  endpoints: (builder) => ({
    getContacts: builder.query<IPerson[], void>({
      query: () => '/contacts',
      providesTags: ['Contacts'],
    }),
    createContact: builder.mutation({
      query: (contact) => ({
        url: '/contacts',
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contacts'],
    }),
    updateContact: builder.mutation({
      query: (contact) => ({
        url: `/contacts/${contact.id}`,
        method: 'PATCH',
        body: contact,
      }),
      invalidatesTags: ['Contacts'],
    }),
    deleteContact: builder.mutation({
      query: (id: number) => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useDeleteContactMutation,
  useCreateContactMutation,
  useUpdateContactMutation,
} = apiSlice;

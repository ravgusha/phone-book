import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { IPerson } from '../../types';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000'}),
    tagTypes: ['Contacts'],
    endpoints: builder => ({
        getContacts: builder.query<IPerson[], void>({
            query: () => '/contacts',
            providesTags: ['Contacts']
        }),
        createContact: builder.mutation({
            query: contact => ({
                url: '/heroes',
                method: 'POST',
                body: contact
            }),
            invalidatesTags: ['Contacts']
        }),
        // deleteHero: builder.mutation({
        //     query: id => ({
        //         url: `/heroes/${id}`,
        //         method: 'DELETE'
        //     }),
        //     invalidatesTags: ['Contacts']
        // })
    })
});

export const {useGetContactsQuery} = apiSlice;

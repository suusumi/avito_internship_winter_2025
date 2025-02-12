import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Item, ItemsResponse, NewItem} from "../model/types.ts";

export const itemsApi = createApi({
    reducerPath: 'itemsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}),
    tagTypes: ['Items'],
    endpoints: (builder) => ({
        // Получение списка объявлений с учётом пагинации
        getItems: builder.query<ItemsResponse, void>({
            query: () => '/items',
            transformResponse: (response: ItemsResponse) => response,
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map((item) => ({type: 'Items' as const, id: item.id})),
                        {type: 'Items', id: 'LIST'},
                    ]
                    : [{type: 'Items', id: 'LIST'}],
        }),
        // Получение одного объявления по id
        getItem: builder.query<Item, number>({
            query: (id) => `/items/${id}`,
            providesTags: (_result, _error, id) => [{type: 'Items', id}],
        }),
        // Создание нового объявления
        addItem: builder.mutation<Item, NewItem>({
            query: (newItem) => ({
                url: '/items',
                method: 'POST',
                body: newItem,
            }),
            invalidatesTags: [{type: 'Items', id: 'LIST'}],
        }),
        // Обновление существующего объявления
        updateItem: builder.mutation<Item, Partial<Item> & Pick<Item, 'id'>>({
            query: ({id, ...update}) => ({
                url: `/items/${id}`,
                method: 'PUT',
                body: update,
            }),
            invalidatesTags: (_result, _error, {id}) => [{type: 'Items', id}],
        }),
        // Удаление объявления по id
        deleteItem: builder.mutation<void, number>({
            query: (id) => ({
                url: `/items/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, id) => [
                {type: 'Items', id},
                {type: 'Items', id: 'LIST'},
            ],
        }),
    }),
});

export const {
    useGetItemsQuery,
    useGetItemQuery,
    useAddItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
} = itemsApi;

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Item, ItemsResponse, NewItem} from "../model/types.ts";

export type ItemsFilter = {
    type?: string;
    search?: string;

    // Фильтры для недвижимости
    propertyType?: string;
    area?: number;
    rooms?: number;
    price?: number;
    areaFrom?: number;
    areaTo?: number;
    priceFrom?: number;
    priceTo?: number;

    // Фильтры для авто
    brand?: string;
    model?: string;
    year?: number;
    mileage?: number;
    yearFrom?: number;
    yearTo?: number;
    mileageFrom?: number;
    mileageTo?: number;

    // Фильтры для услуг
    serviceType?: string;
    experience?: number;
    schedule?: string;

    // Пагинация
    page?: number;
    limit?: number;
};

export const itemsApi = createApi({
    reducerPath: 'itemsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}),
    tagTypes: ['Items'],
    endpoints: (builder) => ({
        // Получение всех объявлений
        getItems: builder.query<ItemsResponse, ItemsFilter | void>({
            query: (filters) => {
                let url = '/items';
                if (filters) {
                    const params = new URLSearchParams();
                    Object.keys(filters).forEach((key) => {
                        const value = filters[key as keyof ItemsFilter];
                        if (value !== undefined && value !== null) {
                            params.append(key, value.toString());
                        }
                    });
                    url += `?${params.toString()}`;
                }
                return url;
            },
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

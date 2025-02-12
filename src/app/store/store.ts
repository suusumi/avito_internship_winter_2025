// src/app/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import {itemsApi} from "../../entities/items/api/itemsApi.ts";
export const store = configureStore({
    reducer: {
        [itemsApi.reducerPath]: itemsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(itemsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
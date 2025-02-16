import {ItemsFilter} from "../../../entities/items/api/itemsApi.ts";

export interface FilterProps {
    filters: ItemsFilter;
    setFilters: (filters: ItemsFilter) => void;
}
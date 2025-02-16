import {useSearchParams} from "react-router-dom";

export const useUrlFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const applyFilters = (filters: Record<string, any>) => {
        const newParams = new URLSearchParams(searchParams);
        Object.keys(filters).forEach((key) => {
            const value = filters[key];
            if (value !== undefined && value !== null && value !== "") {
                newParams.set(key, value.toString());
            } else {
                newParams.delete(key);
            }
        });
        newParams.set("page", "1");
        setSearchParams(newParams);
    };

    const resetFilters = (keys: string[]) => {
        const newParams = new URLSearchParams(searchParams);
        keys.forEach((key) => newParams.delete(key));
        newParams.set("page", "1");
        setSearchParams(newParams);
    };

    return {applyFilters, resetFilters};
};

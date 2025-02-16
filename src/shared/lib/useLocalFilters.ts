import {useState, useEffect} from "react";
import {useSearchParams} from "react-router-dom";

export const useLocalFilters = <T extends Record<string, any>>(filters: T, setFilters: (newFilters: T) => void) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [localFilters, setLocalFilters] = useState<T>(filters);

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleChange = (key: keyof T, value: any) => {
        setLocalFilters(prev => ({...prev, [key]: value}));
    };

    const applyLocalFilters = () => {
        setFilters(localFilters);

        Object.entries(localFilters).forEach(([key, value]) => {
            if (value) {
                searchParams.set(key, value.toString());
            } else {
                searchParams.delete(key);
            }
        });
        setSearchParams(searchParams);
    };

    return {
        localFilters,
        handleChange,
        applyLocalFilters,
    };
};

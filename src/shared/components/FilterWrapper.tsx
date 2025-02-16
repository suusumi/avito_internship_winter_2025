import React from "react";
import {Box, Button} from "@mui/material";
import {useUrlFilters} from "../lib/useUrlFilters";

interface FilterWrapperProps {
    filters: Record<string, any>;
    setFilters: (newFilters: Record<string, any>) => void;
    resetKeys: string[];
    children: React.ReactNode;
}

export const FilterWrapper: React.FC<FilterWrapperProps> = ({
                                                                filters,
                                                                setFilters,
                                                                resetKeys,
                                                                children,
                                                            }) => {
    const {applyFilters, resetFilters} = useUrlFilters();

    return (
        <Box mt={2}>
            {children}
            <Box mt={2} display="flex" gap={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => applyFilters(filters)}
                >
                    Применить фильтры
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                        setFilters({});
                        resetFilters(resetKeys);
                    }}
                >
                    Сбросить фильтры
                </Button>
            </Box>
        </Box>
    );
};

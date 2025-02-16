import React from "react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Box,
} from "@mui/material";
import {FilterProps} from "../../model/types";
import {AutoBrands} from "../../../../entities/items/model/types.ts";
import {FilterWrapper} from "../../../../shared/components/FilterWrapper.tsx";
import {useLocalFilters} from "../../../../shared/lib/useLocalFilters.ts";


export const AutoFilters: React.FC<FilterProps> = ({filters, setFilters}) => {
    const {localFilters, handleChange, applyLocalFilters} = useLocalFilters(filters, setFilters);

    return (
        <FilterWrapper
            filters={localFilters}
            setFilters={applyLocalFilters}
            resetKeys={[
                "brand",
                "model",
                "yearFrom",
                "yearTo",
                "mileageFrom",
                "mileageTo",
                "priceFrom",
                "priceTo"
            ]}
        >
            <Typography variant="h6">Фильтры автомобилей</Typography>
            <FormControl fullWidth margin="normal" required>
                <InputLabel id="auto-brand-label">Марка</InputLabel>
                <Select
                    labelId="auto-brand-label"
                    id="auto-brand"
                    value={localFilters.brand || ""}
                    label="Марка"
                    onChange={(e) => handleChange("brand", e.target.value)}
                >
                    {Object.values(AutoBrands).map((brand) => (
                        <MenuItem key={brand} value={brand}>{brand}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Модель"
                value={localFilters.model || ""}
                onChange={(e) => handleChange("model", e.target.value)}
                fullWidth
                margin="normal"
            />
            <Box sx={{display: "flex", gap: 2}}>
                <TextField
                    label="Год от"
                    type="number"
                    value={localFilters.yearFrom || ""}
                    onChange={(e) => handleChange("yearFrom", e.target.value ? parseInt(e.target.value, 10) : undefined)}
                    sx={{flex: 1}}
                    margin="normal"
                />
                <TextField
                    label="Год до"
                    type="number"
                    value={localFilters.yearTo || ""}
                    onChange={(e) => handleChange("yearTo", e.target.value ? parseInt(e.target.value, 10) : undefined)}
                    sx={{flex: 1}}
                    margin="normal"
                />
            </Box>
        </FilterWrapper>
    );
};

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
import {RealEstatePropertyTypes} from "../../../../entities/items/model/types.ts";
import {FilterWrapper} from "../../../../shared/components/FilterWrapper.tsx";
import {useLocalFilters} from "../../../../shared/lib/useLocalFilters.ts";

export const RealEstateFilters: React.FC<FilterProps> = ({filters, setFilters}) => {
    const {localFilters, handleChange, applyLocalFilters} = useLocalFilters(filters, setFilters);

    return (
        <FilterWrapper
            filters={localFilters}
            setFilters={applyLocalFilters}
            resetKeys={[
                "propertyType",
                "areaFrom",
                "areaTo",
                "rooms",
                "priceFrom",
                "priceTo"
            ]}
        >
            <Typography variant="h6">Фильтры для недвижимости</Typography>
            <FormControl fullWidth margin="normal" required>
                <InputLabel id="property-type-label">Тип недвижимости</InputLabel>
                <Select
                    labelId="property-type-label"
                    id="property-type"
                    value={localFilters.propertyType || ""}
                    label="Тип недвижимости"
                    onChange={(e) => handleChange("propertyType", e.target.value)}
                >
                    {Object.values(RealEstatePropertyTypes).map((option) => (
                        <MenuItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box sx={{display: "flex", gap: 2}}>
                <TextField
                    label="Площадь от"
                    type="number"
                    value={localFilters.areaFrom || ""}
                    onChange={(e) => handleChange("areaFrom", e.target.value ? parseFloat(e.target.value) : undefined)}
                    sx={{flex: 1}}
                    margin="normal"
                />
                <TextField
                    label="Площадь до"
                    type="number"
                    value={localFilters.areaTo || ""}
                    onChange={(e) => handleChange("areaTo", e.target.value ? parseFloat(e.target.value) : undefined)}
                    sx={{flex: 1}}
                    margin="normal"
                />
            </Box>
            <TextField
                label="Количество комнат"
                type="number"
                value={localFilters.rooms || ""}
                onChange={(e) => handleChange("rooms", e.target.value ? parseInt(e.target.value, 10) : undefined)}
                fullWidth
                margin="normal"
            />
            <Box sx={{display: "flex", gap: 2}}>
                <TextField
                    label="Цена от"
                    type="number"
                    value={localFilters.priceFrom || ""}
                    onChange={(e) => handleChange("priceFrom", e.target.value ? parseFloat(e.target.value) : undefined)}
                    sx={{flex: 1}}
                    margin="normal"
                />
                <TextField
                    label="Цена до"
                    type="number"
                    value={localFilters.priceTo || ""}
                    onChange={(e) => handleChange("priceTo", e.target.value ? parseFloat(e.target.value) : undefined)}
                    sx={{flex: 1}}
                    margin="normal"
                />
            </Box>
        </FilterWrapper>
    );
};

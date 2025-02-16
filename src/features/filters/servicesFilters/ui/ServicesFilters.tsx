import React from "react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import {FilterProps} from "../../model/types";
import {ServiceTypes} from "../../../../entities/items/model/types.ts";
import {FilterWrapper} from "../../../../shared/components/FilterWrapper.tsx";
import {useLocalFilters} from "../../../../shared/lib/useLocalFilters.ts";

const serviceTypeOptions = Object.values(ServiceTypes);

export const ServicesFilters: React.FC<FilterProps> = ({filters, setFilters}) => {
    const {localFilters, handleChange, applyLocalFilters} = useLocalFilters(filters, setFilters);

    return (
        <FilterWrapper
            filters={localFilters}
            setFilters={applyLocalFilters}
            resetKeys={["serviceType", "experience", "price"]}
        >
            <Typography variant="h6">Фильтры для услуг</Typography>

            <FormControl fullWidth margin="normal" required>
                <InputLabel id="service-type-label">Тип услуги</InputLabel>
                <Select
                    labelId="service-type-label"
                    id="service-type"
                    value={localFilters.serviceType || ""}
                    label="Тип услуги"
                    onChange={(e) => handleChange("serviceType", e.target.value)}
                >
                    {serviceTypeOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                label="Опыт работы (лет)"
                type="number"
                value={localFilters.experience || ""}
                onChange={(e) => handleChange("experience", e.target.value ? parseInt(e.target.value, 10) : undefined)}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Стоимость до"
                type="number"
                value={localFilters.price || ""}
                onChange={(e) => handleChange("price", e.target.value ? parseFloat(e.target.value) : undefined)}
                fullWidth
                margin="normal"
            />
        </FilterWrapper>
    );
};

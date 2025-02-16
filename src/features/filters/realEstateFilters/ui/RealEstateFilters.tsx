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

export const RealEstateFilters: React.FC<FilterProps> = ({filters, setFilters}) => {
    const propertyOptions = Object.values(RealEstatePropertyTypes);

    return (
        <FilterWrapper
            filters={filters}
            setFilters={setFilters}
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
                    value={filters.propertyType || ""}
                    label="Тип недвижимости"
                    onChange={(e) =>
                        setFilters({...filters, propertyType: e.target.value})
                    }
                >
                    {propertyOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box sx={{display: 'flex', gap: 2}}>
                <TextField
                    label="Площадь от"
                    type="number"
                    value={filters.areaFrom !== undefined ? filters.areaFrom : ""}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            areaFrom: e.target.value ? parseFloat(e.target.value) : undefined,
                        })
                    }
                    sx={{flex: 1}}
                    margin="normal"
                />
                <TextField
                    label="Площадь до"
                    type="number"
                    value={filters.areaTo !== undefined ? filters.areaTo : ""}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            areaTo: e.target.value ? parseFloat(e.target.value) : undefined,
                        })
                    }
                    sx={{flex: 1}}
                    margin="normal"
                />
            </Box>
            <TextField
                label="Количество комнат"
                type="number"
                value={filters.rooms !== undefined ? filters.rooms : ""}
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        rooms: e.target.value ? parseInt(e.target.value, 10) : undefined,
                    })
                }
                fullWidth
                margin="normal"
            />
            <Box sx={{display: 'flex', gap: 2}}>
                <TextField
                    label="Цена от"
                    type="number"
                    value={filters.priceFrom !== undefined ? filters.priceFrom : ""}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            priceFrom: e.target.value ? parseFloat(e.target.value) : undefined,
                        })
                    }
                    sx={{flex: 1}}
                    margin="normal"
                />
                <TextField
                    label="Цена до"
                    type="number"
                    value={filters.priceTo !== undefined ? filters.priceTo : ""}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            priceTo: e.target.value ? parseFloat(e.target.value) : undefined,
                        })
                    }
                    sx={{flex: 1}}
                    margin="normal"
                />
            </Box>
        </FilterWrapper>
    );
};

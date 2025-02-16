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

export const AutoFilters: React.FC<FilterProps> = ({filters, setFilters}) => {
    const autoBrandOptions = Object.values(AutoBrands);
    return (
        <FilterWrapper
            filters={filters}
            setFilters={setFilters}
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
                    value={filters.brand || ""}
                    label="Марка"
                    onChange={(e) =>
                        setFilters({...filters, brand: e.target.value})
                    }
                >
                    {autoBrandOptions.map((brand) => (
                        <MenuItem key={brand} value={brand}>
                            {brand}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Модель"
                value={filters.model || ""}
                onChange={(e) =>
                    setFilters({...filters, model: e.target.value})
                }
                fullWidth
                margin="normal"
            />
            <Box sx={{display: 'flex', gap: 2}}>
                <TextField
                    label="Год от"
                    type="number"
                    value={filters.yearFrom !== undefined ? filters.yearFrom : ""}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            yearFrom: e.target.value ? parseInt(e.target.value, 10) : undefined,
                        })
                    }
                    sx={{flex: 1}}
                    margin="normal"
                />
                <TextField
                    label="Год до"
                    type="number"
                    value={filters.yearTo !== undefined ? filters.yearTo : ""}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            yearTo: e.target.value ? parseInt(e.target.value, 10) : undefined,
                        })
                    }
                    sx={{flex: 1}}
                    margin="normal"
                />
            </Box>
            <Box sx={{display: 'flex', gap: 2}}>
                <TextField
                    label="Пробег от"
                    type="number"
                    value={filters.mileageFrom !== undefined ? filters.mileageFrom : ""}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            mileageFrom: e.target.value ? parseFloat(e.target.value) : undefined,
                        })
                    }
                    sx={{flex: 1}}
                    margin="normal"
                />
                <TextField
                    label="Пробег до"
                    type="number"
                    value={filters.mileageTo !== undefined ? filters.mileageTo : ""}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            mileageTo: e.target.value ? parseFloat(e.target.value) : undefined,
                        })
                    }
                    sx={{flex: 1}}
                    margin="normal"
                />
            </Box>
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

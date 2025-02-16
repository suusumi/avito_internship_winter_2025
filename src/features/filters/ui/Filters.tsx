import React, {useState} from "react";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    SelectChangeEvent
} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import {ItemsFilter} from "../../../entities/items/api/itemsApi.ts";
import {AutoFilters} from "../autoFilters";
import {RealEstateFilters} from "../realEstateFilters";
import {ServicesFilters} from "../servicesFilters";

export const Filters: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string>("");
    const [filters, setFilters] = useState<ItemsFilter>({});
    const [searchParams, setSearchParams] = useSearchParams();

    const handleTypeChange = (event: SelectChangeEvent<string>) => {
        const type = event.target.value;
        setSelectedType(type);

        if (type) {
            searchParams.set("type", type);
        } else {
            searchParams.delete("type");
        }
        searchParams.set("page", "1");
        setSearchParams(searchParams);
        setFilters({});
    };

    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel id="select-type-label">Тип объявлений</InputLabel>
                <Select
                    labelId="select-type-label"
                    id="select-type"
                    value={selectedType}
                    label="Тип объявлений"
                    onChange={handleTypeChange}
                >
                    <MenuItem value="">Все объявления</MenuItem>
                    <MenuItem value="Недвижимость">Недвижимость</MenuItem>
                    <MenuItem value="Авто">Авто</MenuItem>
                    <MenuItem value="Услуги">Услуги</MenuItem>
                </Select>
            </FormControl>

            {selectedType === "" && (
                <Typography variant="h6" mt={2}>
                    Фильтры не выбраны
                </Typography>
            )}
            {selectedType === "Недвижимость" && (
                <RealEstateFilters filters={filters} setFilters={setFilters}/>
            )}
            {selectedType === "Авто" && (
                <AutoFilters filters={filters} setFilters={setFilters}/>
            )}
            {selectedType === "Услуги" && (
                <ServicesFilters filters={filters} setFilters={setFilters}/>
            )}
        </Box>
    );
};

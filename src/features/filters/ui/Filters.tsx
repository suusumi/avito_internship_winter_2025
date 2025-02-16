import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ItemsFilter} from "../../../entities/items/api/itemsApi.ts";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import {RealEstateFilters} from "../realEstateFilters";
import {AutoFilters} from "../autoFilters";
import {ServicesFilters} from "../servicesFilters";

export const Filters: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedType = searchParams.get("type") || "";

    const getFiltersFromParams = () => {
        const filters: Record<string, any> = {};
        searchParams.forEach((value, key) => {
            if (key !== "type" && key !== "page") {
                filters[key] = isNaN(Number(value)) ? value : Number(value);
            }
        });
        return filters;
    };


    const [filters, setFilters] = useState<ItemsFilter>(getFiltersFromParams());

    useEffect(() => {
        setFilters(getFiltersFromParams());
    }, [searchParams]);

    const handleTypeChange = (event: SelectChangeEvent<string>) => {
        const type = event.target.value;

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
                <Typography variant="h6" mt={2}>Фильтры не выбраны</Typography>
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

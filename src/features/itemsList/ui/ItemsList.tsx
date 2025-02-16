import React from "react";
import {useSearchParams} from "react-router-dom";
import {useGetItemsQuery} from "../../../entities/items/api/itemsApi";
import {
    Grid,
    Typography,
    Skeleton,
    Pagination,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    SelectChangeEvent,
} from "@mui/material";
import {ItemsFilter} from "../../../entities/items/api/itemsApi";
import {ItemCard} from "../../itemCard";

export const ItemsList: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const rawFilters = Object.fromEntries(searchParams.entries());
    const page = parseInt(rawFilters.page || "1", 10);
    const limit = parseInt(rawFilters.limit || "5", 10);

    const parsedFilters: ItemsFilter = {
        type: rawFilters.type,
        search: rawFilters.search,
        propertyType: rawFilters.propertyType,
        area: rawFilters.area ? parseFloat(rawFilters.area) : undefined,
        areaFrom: rawFilters.areaFrom ? parseFloat(rawFilters.areaFrom) : undefined,
        areaTo: rawFilters.areaTo ? parseFloat(rawFilters.areaTo) : undefined,
        rooms: rawFilters.rooms ? parseInt(rawFilters.rooms, 10) : undefined,
        price: rawFilters.price ? parseFloat(rawFilters.price) : undefined,
        priceFrom: rawFilters.priceFrom ? parseFloat(rawFilters.priceFrom) : undefined,
        priceTo: rawFilters.priceTo ? parseFloat(rawFilters.priceTo) : undefined,
        brand: rawFilters.brand,
        model: rawFilters.model,
        year: rawFilters.year ? parseInt(rawFilters.year, 10) : undefined,
        yearFrom: rawFilters.yearFrom ? parseInt(rawFilters.yearFrom, 10) : undefined,
        yearTo: rawFilters.yearTo ? parseInt(rawFilters.yearTo, 10) : undefined,
        mileage: rawFilters.mileage ? parseFloat(rawFilters.mileage) : undefined,
        mileageFrom: rawFilters.mileageFrom ? parseFloat(rawFilters.mileageFrom) : undefined,
        mileageTo: rawFilters.mileageTo ? parseFloat(rawFilters.mileageTo) : undefined,
        serviceType: rawFilters.serviceType,
        experience: rawFilters.experience ? parseInt(rawFilters.experience, 10) : undefined,
        schedule: rawFilters.schedule,
        page,
        limit,
    };

    const {data, error, isLoading} = useGetItemsQuery(parsedFilters);

    const itemsPerPage = limit;
    const totalCount = data?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", newPage.toString());
        setSearchParams(newParams);
    };

    const handleLimitChange = (event: SelectChangeEvent<number>) => {
        const newLimit = Number(event.target.value);
        const newParams = new URLSearchParams(searchParams);
        newParams.set("limit", newLimit.toString());
        newParams.set("page", "1");
        setSearchParams(newParams);
    };

    if (isLoading) {
        return (
            <Grid container spacing={2}>
                {Array.from(new Array(itemsPerPage)).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Skeleton variant="rectangular" width="100%" height={200}/>
                        <Skeleton variant="text" sx={{mt: 1}}/>
                        <Skeleton variant="text"/>
                    </Grid>
                ))}
            </Grid>
        );
    }

    if (error) {
        return <Typography color="error">Ошибка при загрузке данных</Typography>;
    }

    return (
        <Box>
            <Grid container spacing={2}>
                {data?.data.length ? (
                    data.data.map((item) => (
                        <Grid item xs={12} sm={12} md={12} key={item.id}>
                            <ItemCard item={item}/>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography variant="h6" align="center">
                            Объявлений не найдено
                        </Typography>
                    </Grid>
                )}
            </Grid>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                {totalPages > 1 && (
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                )}
                <FormControl variant="outlined" size="small">
                    <InputLabel id="limit-label">Записей на странице</InputLabel>
                    {totalPages > 1 && (
                        <Select
                            labelId="limit-label"
                            value={itemsPerPage}
                            onChange={handleLimitChange}
                            sx={{minWidth: "150px"}}
                        >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                        </Select>
                    )}
                </FormControl>
            </Box>
        </Box>
    );
};

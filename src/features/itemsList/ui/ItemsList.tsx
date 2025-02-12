import React from 'react';
import {useSearchParams} from 'react-router-dom';
import {useGetItemsQuery} from '../../../entities/items/api/itemsApi';
import {Grid, Typography, Skeleton, Pagination, Box} from '@mui/material';
import {ItemCard} from "../../itemCard";


export const ItemsList: React.FC = () => {
    // Параметры из URL
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryFilter = searchParams.get('category');
    const searchText = searchParams.get('q');
    const page = parseInt(searchParams.get('page') || '1', 10);

    // Запрос данных
    const {data, error, isLoading} = useGetItemsQuery();

    // Фильтрация объявлений по параметрам из URL
    const filteredItems = data?.data.filter((item) => {
        if (categoryFilter && item.type !== categoryFilter) {
            return false;
        }
        if (searchText && !item.name.toLowerCase().includes(searchText.toLowerCase())) {
            return false;
        }
        return true;
    }) || [];

    // Пагинация
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginatedItems = filteredItems.slice(
        (page - 1) * itemsPerPage,
        (page - 1) * itemsPerPage + itemsPerPage
    );

    const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
        searchParams.set('page', newPage.toString());
        setSearchParams(searchParams);
    };

    // Пока данные загружаются – скелетон
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

    // Если произошла ошибка при загрузке данных
    if (error) {
        return <Typography color="error">Ошибка при загрузке данных</Typography>;
    }

    return (
        <Box>
            <Grid container spacing={2}>
                {paginatedItems.length > 0 ? (
                    paginatedItems.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
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
            {totalPages > 1 && (
                <Box display="flex" justifyContent="center" marginTop={2}>
                    <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary"/>
                </Box>
            )}
        </Box>
    );
};

import React from 'react';
import {useParams, Link, useLocation} from 'react-router-dom';
import {useGetItemQuery} from '../../../entities/items/api/itemsApi';
import {Box, Typography, CircularProgress, Button, Chip, Grid} from '@mui/material';
import {ItemTypes} from '../../../entities/items/model/types';

export const DetailedItemPage: React.FC = () => {
    const {id} = useParams();
    const {search} = useLocation();
    const itemId = Number(id);
    const {data: item, error, isLoading} = useGetItemQuery(itemId);

    const searchParams = new URLSearchParams(search);

    if (isLoading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
                <CircularProgress/>
            </Box>
        );
    }

    if (error || !item) {
        return (
            <Typography variant="h6" color="error" align="center" sx={{mt: 4}}>
                Ошибка при загрузке объявления
            </Typography>
        );
    }
    console.log("Фильтры при возврате:", searchParams.toString());
    console.log("Фильтры перед возвратом:", searchParams.toString());

    return (
        <Box mt={2}>

            <Button
                component={Link}
                to={`/?${searchParams.toString()}`}
                variant="outlined"
                sx={{mb: 2}}
            >
                Назад к списку
            </Button>


            <Box>
                {item.image ? (

                    <Box
                        sx={{
                            height: {xs: "45vw", md: "30vw"},
                            backgroundColor: 'grey.200',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Box
                            component="img"
                            src={item.image}
                            alt={item.name}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>
                ) : (
                    <Box
                        sx={{
                            width: '100%',
                            height: '400px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'grey.200',
                            borderRadius: 1,
                            mb: 2,
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            Изображение отсутствует
                        </Typography>
                    </Box>
                )}
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 1,
                        mb: 2,
                        mt: 2,
                    }}
                >
                    <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap'}}>
                        <Chip label={item.type} variant="outlined" color="primary"/>
                        <Chip label={item.location} variant="outlined" color="secondary"/>
                    </Box>
                    {(item.type === ItemTypes.REAL_ESTATE || item.type === ItemTypes.SERVICE) && (
                        <Typography variant="h5">{item.price} руб.</Typography>
                    )}
                </Box>

                <Box mb={3}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        {item.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {item.description}
                    </Typography>
                </Box>

                {item.type === ItemTypes.REAL_ESTATE && (
                    <>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            О недвижимости
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                                <Typography>
                                    Тип недвижимости:{' '}
                                    <Typography component="span" fontWeight="bold">
                                        {item.propertyType}
                                    </Typography>
                                </Typography>
                                <Typography>
                                    Площадь:{' '}
                                    <Typography component="span" fontWeight="bold">
                                        {item.area} м²
                                    </Typography>
                                </Typography>
                                <Typography>
                                    Количество комнат:{' '}
                                    <Typography component="span" fontWeight="bold">
                                        {item.rooms}
                                    </Typography>
                                </Typography>
                            </Grid>
                        </Grid>
                    </>
                )}

                {item.type === ItemTypes.AUTO && (
                    <>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Об автомобиле
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                                <Typography>
                                    Марка:{' '}
                                    <Typography component="span" fontWeight="bold">
                                        {item.brand}
                                    </Typography>
                                </Typography>
                                <Typography>
                                    Модель:{' '}
                                    <Typography component="span" fontWeight="bold">
                                        {item.model}
                                    </Typography>
                                </Typography>
                                <Typography>
                                    Год выпуска:{' '}
                                    <Typography component="span" fontWeight="bold">
                                        {item.year}
                                    </Typography>
                                </Typography>
                                {item.mileage !== undefined && (
                                    <Typography>
                                        Пробег:{' '}
                                        <Typography component="span" fontWeight="bold">
                                            {item.mileage} км
                                        </Typography>
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </>
                )}

                {item.type === ItemTypes.SERVICE && (
                    <>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Об услуге
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                                <Typography>
                                    Тип услуги:{' '}
                                    <Typography component="span" fontWeight="bold">
                                        {item.serviceType}
                                    </Typography>
                                </Typography>
                                <Typography>
                                    Опыт работы:{' '}
                                    <Typography component="span" fontWeight="bold">
                                        {item.experience} лет
                                    </Typography>
                                </Typography>
                            </Grid>
                            {item.schedule && (
                                <Grid item xs={12} md={6}>
                                    <Typography>
                                        График работы:{' '}
                                        <Typography component="span" fontWeight="bold">
                                            {item.schedule}
                                        </Typography>
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </>
                )}
            </Box>
        </Box>
    );
};

import React from 'react';
import {Card, CardMedia, CardContent, Typography, CardActions, Button, Box} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import {Item} from '../../../entities/items/model/types';

interface ItemCardProps {
    item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({item}) => {
    return (
        <Card>
            {item.image ? (
                <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.name}
                />
            ) : (
                <Box
                    sx={{
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'grey.200'
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        Изображение отсутствует
                    </Typography>
                </Box>
            )}
            <CardContent>
                <Typography variant="h6" component="div">
                    {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {item.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Категория: {item.type}
                </Typography>
                {item.type !== "Авто" && (
                    <Typography>{item.price + ' Р'}</Typography>
                )}
            </CardContent>
            <CardActions>
                <Button size="small" component={RouterLink} to={`/item/${item.id}`}>
                    Открыть
                </Button>
                <Button
                    size="small"
                    component={RouterLink}
                    to={`/form/${item.id}`}
                    color="primary"
                >
                    Редактировать
                </Button>
            </CardActions>
        </Card>
    );
};

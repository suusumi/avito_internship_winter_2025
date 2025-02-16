import React from 'react';
import {Box, TextField, FormControl, InputLabel, Select, MenuItem, Button} from '@mui/material';
import {ItemTypes} from '../../../entities/items/model/types';
import {CategoryFormData} from "../model/types.ts";

interface CategoryFormStepProps {
    type: string;
    formData: CategoryFormData;
    onChange: (field: keyof CategoryFormData, value: any) => void;
    onBack: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

export const CategoryFormStep: React.FC<CategoryFormStepProps> = ({type, formData, onChange, onBack}) => {
    return (
        <Box>
            {type === ItemTypes.REAL_ESTATE && (
                <>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel id="propertyType-label">Тип недвижимости</InputLabel>
                        <Select
                            labelId="propertyType-label"
                            label="Тип недвижимости"
                            value={formData.propertyType || ''}
                            onChange={(e) => onChange('propertyType', e.target.value)}
                        >
                            <MenuItem value="Квартира">Квартира</MenuItem>
                            <MenuItem value="Дом">Дом</MenuItem>
                            <MenuItem value="Коттедж">Коттедж</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Площадь (м²)"
                        type="number"
                        fullWidth
                        margin="normal"
                        required
                        value={formData.area || ''}
                        onChange={(e) => onChange('area', Number(e.target.value))}
                    />
                    <TextField
                        label="Количество комнат"
                        type="number"
                        fullWidth
                        margin="normal"
                        required
                        value={formData.rooms || ''}
                        onChange={(e) => onChange('rooms', Number(e.target.value))}
                    />
                    <TextField
                        label="Цена (₽)"
                        type="number"
                        fullWidth
                        margin="normal"
                        required
                        value={formData.price || ''}
                        onChange={(e) => onChange('price', Number(e.target.value))}
                    />
                </>
            )}
            {type === ItemTypes.AUTO && (
                <>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel id="brand-label">Марка</InputLabel>
                        <Select
                            labelId="brand-label"
                            label="Марка"
                            value={formData.brand || ''}
                            onChange={(e) => onChange('brand', e.target.value)}
                        >
                            <MenuItem value="Toyota">Toyota</MenuItem>
                            <MenuItem value="Honda">Honda</MenuItem>
                            <MenuItem value="BMW">BMW</MenuItem>
                            <MenuItem value="Mercedes">Mercedes</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Модель"
                        fullWidth
                        margin="normal"
                        required
                        value={formData.model || ''}
                        onChange={(e) => onChange('model', e.target.value)}
                    />
                    <TextField
                        label="Год выпуска"
                        type="number"
                        fullWidth
                        margin="normal"
                        required
                        value={formData.year || ''}
                        onChange={(e) => onChange('year', Number(e.target.value))}
                    />
                    <TextField
                        label="Пробег (км)"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={formData.mileage || ''}
                        onChange={(e) => onChange('mileage', Number(e.target.value))}
                    />
                </>
            )}
            {type === ItemTypes.SERVICE && (
                <>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel id="serviceType-label">Тип услуги</InputLabel>
                        <Select
                            labelId="serviceType-label"
                            label="Тип услуги"
                            value={formData.serviceType || ''}
                            onChange={(e) => onChange('serviceType', e.target.value)}
                        >
                            <MenuItem value="Ремонт">Ремонт</MenuItem>
                            <MenuItem value="Уборка">Уборка</MenuItem>
                            <MenuItem value="Доставка">Доставка</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Опыт работы (лет)"
                        type="number"
                        fullWidth
                        margin="normal"
                        required
                        value={formData.experience || ''}
                        onChange={(e) => onChange('experience', Number(e.target.value))}
                    />
                    <TextField
                        label="Цена (₽)"
                        type="number"
                        fullWidth
                        margin="normal"
                        required
                        value={formData.price || ''}
                        onChange={(e) => onChange('price', Number(e.target.value))}
                    />
                    <TextField
                        label="График работы"
                        fullWidth
                        margin="normal"
                        value={formData.schedule || ''}
                        onChange={(e) => onChange('schedule', e.target.value)}
                    />
                </>
            )}
            <Box sx={{mt: 2, display: 'flex', justifyContent: 'space-between'}}>
                <Button variant="outlined" onClick={onBack} type="button">
                    Назад
                </Button>
                <Button variant="contained" type="submit">
                    Сохранить объявление
                </Button>
            </Box>
        </Box>
    );
};

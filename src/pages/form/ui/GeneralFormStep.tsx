import React, {useState} from 'react';
import {Box, TextField, FormControl, InputLabel, Select, MenuItem, Button} from '@mui/material';
import {ItemTypes} from '../../../entities/items/model/types';
import {GeneralFormData} from "../model/types.ts";

interface GeneralFormStepProps {
    formData: GeneralFormData;
    onChange: (field: keyof GeneralFormData, value: any) => void;
    onNext: () => void;
}

export const GeneralFormStep: React.FC<GeneralFormStepProps> = ({formData, onChange, onNext}) => {
    const [imageError, setImageError] = useState<string>('');

    const isValidUrl = (url: string): boolean => {
        try {
            if (!url) return true;
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleImageBlur = () => {
        if (formData.image && !isValidUrl(formData.image)) {
            setImageError('Введите корректный URL');
        } else {
            setImageError('');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Проверяем ещё раз значение поля "Фото (url)"
        if (formData.image && !isValidUrl(formData.image)) {
            setImageError('Введите корректный URL');
            return;
        }
        if (imageError) return;
        onNext();
    };

    return (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
                label="Название"
                fullWidth
                margin="normal"
                required
                value={formData.name}
                onChange={(e) => onChange('name', e.target.value)}
            />
            <TextField
                label="Описание"
                fullWidth
                margin="normal"
                required
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => onChange('description', e.target.value)}
            />
            <TextField
                label="Локация"
                fullWidth
                margin="normal"
                required
                value={formData.location}
                onChange={(e) => onChange('location', e.target.value)}
            />
            <TextField
                label="Фото (url)"
                fullWidth
                margin="normal"
                value={formData.image}
                onChange={(e) => onChange('image', e.target.value)}
                onBlur={handleImageBlur}
                error={!!imageError}
                helperText={imageError}
            />
            <FormControl fullWidth margin="normal" required>
                <InputLabel id="category-label">Категория объявления</InputLabel>
                <Select
                    labelId="category-label"
                    label="Категория объявления"
                    value={formData.type}
                    onChange={(e) => onChange('type', e.target.value as ItemTypes)}
                >
                    <MenuItem value={ItemTypes.REAL_ESTATE}>Недвижимость</MenuItem>
                    <MenuItem value={ItemTypes.AUTO}>Авто</MenuItem>
                    <MenuItem value={ItemTypes.SERVICE}>Услуги</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{mt: 2, display: 'flex', justifyContent: 'flex-end'}}>
                <Button variant="contained" type="submit">
                    Далее
                </Button>
            </Box>
        </Box>
    );
};

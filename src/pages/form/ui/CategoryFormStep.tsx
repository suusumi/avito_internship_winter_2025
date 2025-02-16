import React, {useState} from "react";
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from "@mui/material";
import {ItemTypes} from "../../../entities/items/model/types";
import {CategoryFormData} from "../model/types.ts";

interface CategoryFormStepProps {
    type: string;
    formData: CategoryFormData;
    onChange: (field: keyof CategoryFormData, value: any) => void;
    onBack: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

export const CategoryFormStep: React.FC<CategoryFormStepProps> = ({type, formData, onChange, onBack, onSubmit}) => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleNumberChange = (
        field: keyof CategoryFormData,
        value: string,
        min: number,
        max: number
    ) => {
        if (!/^\d*$/.test(value)) return;

        if (value.length > 4) return;

        onChange(field, value);

        const numericValue = Number(value);
        if (numericValue >= min && numericValue <= max) {
            setErrors(prev => ({...prev, [field]: ""}));
        } else {
            setErrors(prev => ({...prev, [field]: `Введите значение от ${min} до ${max}`}));
        }
    };

    const isFormValid = () => {
        return (
            Object.values(errors).every(error => error === "") &&
            Object.entries(formData).every(([key, value]) => {
                if (["year", "experience", "rooms", "area", "price", "mileage"].includes(key)) {
                    return value !== undefined && value !== "";
                }
                return true;
            })
        );
    };


    return (
        <Box>
            {type === ItemTypes.REAL_ESTATE && (
                <>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel id="propertyType-label">Тип недвижимости</InputLabel>
                        <Select
                            labelId="propertyType-label"
                            label="Тип недвижимости"
                            value={formData.propertyType || ""}
                            onChange={(e) => onChange("propertyType", e.target.value)}
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
                        error={!!errors.area}
                        helperText={errors.area}
                        value={formData.area || ""}
                        onChange={(e) => handleNumberChange("area", e.target.value, 10, 1000)}
                    />
                    <TextField
                        label="Количество комнат"
                        type="number"
                        fullWidth
                        margin="normal"
                        required
                        error={!!errors.rooms}
                        helperText={errors.rooms}
                        value={formData.rooms || ""}
                        onChange={(e) => handleNumberChange("rooms", e.target.value, 1, 10)}
                    />
                    <TextField
                        label="Цена (Р)"
                        type="number"
                        fullWidth
                        margin="normal"
                        required
                        error={!!errors.price}
                        helperText={errors.price}
                        value={formData.price || ""}
                        onChange={(e) => handleNumberChange("price", e.target.value, 10000, 100000000)}
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
                            value={formData.brand || ""}
                            onChange={(e) => onChange("brand", e.target.value)}
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
                        value={formData.model || ""}
                        onChange={(e) => onChange("model", e.target.value)}
                    />
                    <TextField
                        label="Год выпуска"
                        type="text"
                        fullWidth
                        margin="normal"
                        required
                        error={!!errors.year}
                        helperText={errors.year}
                        value={formData.year || ""}
                        onChange={(e) => handleNumberChange("year", e.target.value, 1900, new Date().getFullYear())}
                        onBlur={(e) => {
                            const numericValue = Number(e.target.value);
                            if (!isNaN(numericValue)) {
                                onChange("year", numericValue);
                            }
                        }}
                    />


                    <TextField
                        label="Пробег (км)"
                        type="number"
                        fullWidth
                        margin="normal"
                        error={!!errors.mileage}
                        helperText={errors.mileage}
                        value={formData.mileage || ""}
                        onChange={(e) => handleNumberChange("mileage", e.target.value, 0, 1000000)}
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
                            value={formData.serviceType || ""}
                            onChange={(e) => onChange("serviceType", e.target.value)}
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
                        error={!!errors.experience}
                        helperText={errors.experience}
                        value={formData.experience || ""}
                        onChange={(e) => handleNumberChange("experience", e.target.value, 0, 50)}
                    />
                    <TextField
                        label="Цена (Р)"
                        type="number"
                        fullWidth
                        margin="normal"
                        required
                        error={!!errors.price}
                        helperText={errors.price}
                        value={formData.price || ""}
                        onChange={(e) => handleNumberChange("price", e.target.value, 100, 10000000)}
                    />
                    <TextField
                        label="График работы"
                        fullWidth
                        margin="normal"
                        value={formData.schedule || ""}
                        onChange={(e) => onChange("schedule", e.target.value)}
                    />
                </>
            )}
            <Box sx={{mt: 2, display: "flex", justifyContent: "space-between"}}>
                <Button variant="outlined" onClick={onBack} type="button">
                    Назад
                </Button>
                <Button
                    variant="contained"
                    type="submit"
                    onClick={onSubmit}
                    disabled={!isFormValid()}
                >
                    Сохранить объявление
                </Button>
            </Box>
        </Box>
    );
};

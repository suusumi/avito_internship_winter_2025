import React, {FormEvent, useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import {AutoItem, ItemTypes, RealEstateItem, ServiceItem,} from '../../../entities/items/model/types';
import {useAddItemMutation, useGetItemQuery, useUpdateItemMutation,} from '../../../entities/items/api/itemsApi';
import {GeneralFormStep} from './GeneralFormStep';
import {CategoryFormStep} from './CategoryFormStep';
import {CategoryFormData, GeneralFormData} from "../model/types.ts";

export interface FormData extends GeneralFormData, CategoryFormData {
}

const initialFormData: FormData = {
    name: '',
    description: '',
    location: '',
    image: '',
    type: ItemTypes.AUTO,
};

export const FormPage: React.FC = () => {
    const {id} = useParams<{ id?: string }>();
    const isEditMode = Boolean(id);
    const navigate = useNavigate();

    const {data: existingItem, isLoading: isLoadingItem} = useGetItemQuery(
        Number(id),
        {skip: !isEditMode}
    );
    const [formData, setFormData] = useState<FormData>(() => {
        if (!isEditMode) {
            const draft = localStorage.getItem('announcementDraft');
            return draft ? JSON.parse(draft) : initialFormData;
        }
        return initialFormData;
    });
    const [step, setStep] = useState<number>(0);
    const [addItem] = useAddItemMutation();
    const [updateItem] = useUpdateItemMutation();

    useEffect(() => {
        if (isEditMode && existingItem) {
            switch (existingItem.type) {
                case ItemTypes.REAL_ESTATE: {
                    const realEstateItem = existingItem as RealEstateItem;
                    setFormData({
                        name: realEstateItem.name,
                        description: realEstateItem.description,
                        location: realEstateItem.location,
                        image: realEstateItem.image || '',
                        type: realEstateItem.type,
                        propertyType: realEstateItem.propertyType,
                        area: realEstateItem.area,
                        rooms: realEstateItem.rooms,
                        price: realEstateItem.price,
                    });
                    break;
                }
                case ItemTypes.AUTO: {
                    const autoItem = existingItem as AutoItem;
                    setFormData({
                        name: autoItem.name,
                        description: autoItem.description,
                        location: autoItem.location,
                        image: autoItem.image || '',
                        type: autoItem.type,
                        brand: autoItem.brand,
                        model: autoItem.model,
                        year: autoItem.year,
                        mileage: autoItem.mileage,
                    });
                    break;
                }
                case ItemTypes.SERVICE: {
                    const serviceItem = existingItem as ServiceItem;
                    setFormData({
                        name: serviceItem.name,
                        description: serviceItem.description,
                        location: serviceItem.location,
                        image: serviceItem.image || '',
                        type: serviceItem.type,
                        serviceType: serviceItem.serviceType,
                        experience: serviceItem.experience,
                        price: serviceItem.price,
                        schedule: serviceItem.schedule,
                    });
                    break;
                }
            }
        }
    }, [isEditMode, existingItem]);

    useEffect(() => {
        if (!isEditMode) {
            localStorage.setItem('announcementDraft', JSON.stringify(formData));
        }
    }, [formData, isEditMode]);

    const handleGeneralChange = (field: keyof GeneralFormData, value: any) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleCategoryChange = (field: keyof CategoryFormData, value: any) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleNext = () => {
        if (!formData.name || !formData.description || !formData.location || !formData.type) {
            alert('Заполните все обязательные поля общего шага.');
            return;
        }
        setStep(1);
    };

    const handleBack = () => {
        setStep(0);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (formData.type === null) {
            alert("Выберите категорию объявления");
            return;
        }

        if (formData.type === ItemTypes.REAL_ESTATE) {
            if (!formData.propertyType || !formData.area || !formData.rooms || !formData.price) {
                alert('Заполните все обязательные поля для недвижимости.');
                return;
            }
        } else if (formData.type === ItemTypes.AUTO) {
            if (!formData.brand || !formData.model || !formData.year) {
                alert('Заполните все обязательные поля для авто.');
                return;
            }
        } else if (formData.type === ItemTypes.SERVICE) {
            if (!formData.serviceType || !formData.experience || !formData.price) {
                alert('Заполните все обязательные поля для услуг.');
                return;
            }
        }

        try {
            if (isEditMode && id) {
                if (formData.type === ItemTypes.REAL_ESTATE) {
                    await updateItem({
                        id: Number(id),
                        ...formData,
                    } as ({ id: number } & Partial<RealEstateItem> & { type: ItemTypes.REAL_ESTATE })).unwrap();
                } else if (formData.type === ItemTypes.AUTO) {
                    await updateItem({
                        id: Number(id),
                        ...formData,
                    } as ({ id: number } & Partial<AutoItem> & { type: ItemTypes.AUTO })).unwrap();
                } else if (formData.type === ItemTypes.SERVICE) {
                    await updateItem({
                        id: Number(id),
                        ...formData,
                    } as ({ id: number } & Partial<ServiceItem> & { type: ItemTypes.SERVICE })).unwrap();
                }
            } else {
                await addItem(formData).unwrap();
                localStorage.removeItem('announcementDraft');
            }
            navigate('/');
        } catch (error) {
            console.error('Ошибка при отправке формы', error);
            alert('Ошибка при сохранении объявления');
        }
    };


    if (isEditMode && isLoadingItem) {
        return <Typography>Загрузка...</Typography>;
    }

    return (
        <Box sx={{maxWidth: 600, mx: 'auto', p: 2}}>
            <Typography variant="h4" gutterBottom>
                {isEditMode ? 'Редактирование объявления' : 'Размещение нового объявления'}
            </Typography>
            {step === 0 ? (
                <GeneralFormStep formData={formData} onChange={handleGeneralChange} onNext={handleNext}/>
            ) : (
                <form onSubmit={handleSubmit}>
                    <CategoryFormStep
                        type={formData.type}
                        formData={formData}
                        onChange={handleCategoryChange}
                        onBack={handleBack}
                        onSubmit={handleSubmit}
                    />
                </form>
            )}
        </Box>
    );
};

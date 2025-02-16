import {ItemTypes} from "../../../entities/items/model/types.ts";

export interface GeneralFormData {
    name: string;
    description: string;
    location: string;
    image: string;
    type: ItemTypes;
}

export interface CategoryFormData {
    // Недвижимость
    propertyType?: string;
    area?: number;
    rooms?: number;
    // Авто
    brand?: string;
    model?: string;
    year?: number;
    mileage?: number;
    // Услуги
    serviceType?: string;
    experience?: number;
    schedule?: string;
    price?: number;
}

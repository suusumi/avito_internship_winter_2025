export enum ItemTypes {
    REAL_ESTATE = 'Недвижимость',
    AUTO = 'Авто',
    SERVICE = 'Услуги'
}

export enum RealEstatePropertyTypes {
    APARTMENT = 'Квартира',
    HOUSE = 'Дом',
    COTTAGE = 'Коттедж',
}

export enum AutoBrands {
    BMW = 'BMW',
    MERCEDES = 'Mercedes',
    TOYOTA = 'Toyota',
    HONDA = 'Honda',
}

export enum ServiceTypes {
    REPAIR = 'Ремонт',
    CLEANING = 'Уборка',
    DELIVERY = 'Доставка',
}

export interface BaseItem {
    id: number;
    name: string;
    description: string;
    location: string;
    image: string;
    type: ItemTypes;
}

export interface RealEstateItem extends BaseItem {
    type: ItemTypes.REAL_ESTATE;
    propertyType: RealEstatePropertyTypes;
    area: number;
    rooms: number;
    price: number;
}

export interface AutoItem extends BaseItem {
    type: ItemTypes.AUTO;
    brand: AutoBrands;
    model: string;
    year: number;
    mileage?: number;
}

export interface ServiceItem extends BaseItem {
    type: ItemTypes.SERVICE;
    serviceType: ServiceTypes;
    experience: number;
    price: number;
    schedule?: string;
}

export type Item = RealEstateItem | AutoItem | ServiceItem;

export type NewItem = Omit<Item, 'id'>;

export interface ItemsResponse {
    data: Item[];
    page: number;
    limit: number;
    totalCount: number;
}

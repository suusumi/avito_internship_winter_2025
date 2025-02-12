export interface BaseItem {
    id: number;
    name: string;
    description: string;
    location: string;
    image: string;
    type: 'Недвижимость' | 'Авто' | 'Услуги';
}

// Недвижимость
export interface RealEstateItem extends BaseItem {
    type: 'Недвижимость';
    propertyType: string;
    area: number;
    rooms: number;
    price: number;
}

// Авто
export interface AutoItem extends BaseItem {
    type: 'Авто';
    brand: string;
    model: string;
    year: number;
    mileage?: number;
}

// Услуги
export interface ServiceItem extends BaseItem {
    type: 'Услуги';
    serviceType: string;
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
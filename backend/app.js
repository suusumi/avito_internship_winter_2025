const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const ItemTypes = {
    REAL_ESTATE: 'Недвижимость',
    AUTO: 'Авто',
    SERVICES: 'Услуги',
};

const app = express();
app.use(cors()); // Корс
app.use(bodyParser.json());

// In-memory хранилище для объявлений
let items = [
    {
        id: 1,
        name: "Профессиональный ремонт квартир",
        description: "Опыт более 10 лет, качественно и быстро.",
        location: "Москва",
        type: ItemTypes.SERVICES,
        serviceType: "Ремонт",
        experience: 10,
        price: 50000,
        schedule: "Пн-Пт 9:00-18:00"
    },
    {
        id: 2,
        name: "Уборка офисов",
        description: "Ежедневная уборка с использованием экологичных средств.",
        location: "Санкт-Петербург",
        image: "https://avatars.mds.yandex.net/i?id=937e3705dbba9db505162b223e02d0fc_l-9151245-images-thumbs&n=13",
        type: ItemTypes.SERVICES,
        serviceType: "Уборка",
        experience: 5,
        price: 15000,
        schedule: "Пн-Сб 8:00-20:00"
    },
    {
        id: 3,
        name: "Доставка еды",
        description: "Быстрая доставка с широким ассортиментом блюд.",
        location: "Казань",
        image: "https://avatars.mds.yandex.net/i?id=ce1a6abe6b589d3b5a87396550b1f5fa_l-3989655-images-thumbs&n=13",
        type: ItemTypes.SERVICES,
        serviceType: "Доставка",
        experience: 3,
        price: 300,
        schedule: "Круглосуточно"
    },
    {
        id: 4,
        name: "Toyota Camry 2020",
        description: "Надежный седан с современными технологиями.",
        location: "Москва",
        image: "https://avatars.mds.yandex.net/get-altay/6363798/2a00000180b346613492e1251c765ec146cf/XXL_height",
        type: ItemTypes.AUTO,
        brand: "Toyota",
        model: "Camry",
        year: 2020,
        mileage: 50000,
    },
    {
        id: 5,
        name: "Honda Civic 2018",
        description: "Компактный и экономичный автомобиль.",
        location: "Санкт-Петербург",
        image: "https://avatars.mds.yandex.net/get-verba/787013/2a000001609d493866c24516dc16f0c5425c/cattouchret",
        type: ItemTypes.AUTO,
        brand: "Honda",
        model: "Civic",
        year: 2018,
        mileage: 70000,
    },
    {
        id: 6,
        name: "Квартира в центре",
        description: "Уютная квартира с видом на город.",
        location: "Москва",
        image: "https://mig.pics/uploads/posts/2020-02/1582215061_30-p-intereri-malenkikh-studii-40.jpg",
        type: ItemTypes.REAL_ESTATE,
        propertyType: "Квартира",
        area: 60,
        rooms: 2,
        price: 20000000
    },
    {
        id: 7,
        name: "Дом за городом",
        description: "Просторный дом с участком в тихом районе.",
        location: "Подмосковье",
        image: "https://avatars.mds.yandex.net/i?id=0948270f8c34eb8c839e05e3f31a5f69_l-5209794-images-thumbs&n=13",
        type: ItemTypes.REAL_ESTATE,
        propertyType: "Дом",
        area: 150,
        rooms: 4,
        price: 30000000
    }
];

const makeCounter = () => {
    let count = 8;
    return () => count++;
};

const itemsIdCounter = makeCounter();

// Создание нового объявления
app.post('/items', (req, res) => {
    const {name, description, location, type, ...rest} = req.body;

    // Validate common required fields
    if (!name || !description || !location || !type) {
        return res.status(400).json({error: 'Missing required common fields'});
    }

    switch (type) {
        case ItemTypes.REAL_ESTATE:
            if (!rest.propertyType || !rest.area || !rest.rooms || !rest.price) {
                return res.status(400).json({error: 'Missing required fields for Real estate'});
            }
            break;
        case ItemTypes.AUTO:
            if (!rest.brand || !rest.model || !rest.year) {
                return res.status(400).json({error: 'Missing required fields for Auto'});
            }
            break;
        case ItemTypes.SERVICES:
            if (!rest.serviceType || !rest.experience || !rest.price) {
                return res.status(400).json({error: 'Missing required fields for Services'});
            }
            break;
        default:
            return res.status(400).json({error: 'Invalid type'});
    }

    const item = {
        id: itemsIdCounter(),
        name,
        description,
        location,
        type,
        ...rest,
    };

    items.push(item);
    res.status(201).json(item);
});

// Получение всех объявлений с пагинацией и фильтрацией
app.get('/items', (req, res) => {
    let filteredItems = items;

    // Фильтрация по типу
    if (req.query.type) {
        filteredItems = filteredItems.filter(item => item.type === req.query.type);
    }

    // Поиск по названию
    if (req.query.search) {
        const searchTerm = req.query.search.toLowerCase();
        filteredItems = filteredItems.filter(item =>
            item.name.toLowerCase().includes(searchTerm)
        );
    }

    // Фильтрация для недвижимости
    if (req.query.propertyType) {
        filteredItems = filteredItems.filter(item => {
            if (item.type === ItemTypes.REAL_ESTATE) {
                return item.propertyType === req.query.propertyType;
            }
            return true;
        });
    }

    if (req.query.rooms) {
        const rooms = parseInt(req.query.rooms, 10);
        filteredItems = filteredItems.filter(item => {
            if (item.type === ItemTypes.REAL_ESTATE && typeof item.rooms === 'number') {
                return item.rooms === rooms;
            }
            return true;
        });
    }

    if (req.query.areaFrom) {
        const areaFrom = parseFloat(req.query.areaFrom);
        filteredItems = filteredItems.filter(item => {
            if (item.type === ItemTypes.REAL_ESTATE && typeof item.area === 'number') {
                return item.area >= areaFrom;
            }
            return true;
        });
    }
    if (req.query.areaTo) {
        const areaTo = parseFloat(req.query.areaTo);
        filteredItems = filteredItems.filter(item => {
            if (item.type === ItemTypes.REAL_ESTATE && typeof item.area === 'number') {
                return item.area <= areaTo;
            }
            return true;
        });
    }
    if (req.query.priceFrom) {
        const priceFrom = parseFloat(req.query.priceFrom);
        filteredItems = filteredItems.filter(item => {
            if (item.type === ItemTypes.REAL_ESTATE && typeof item.price === 'number') {
                return item.price >= priceFrom;
            }
            return true;
        });
    }
    if (req.query.priceTo) {
        const priceTo = parseFloat(req.query.priceTo);
        filteredItems = filteredItems.filter(item => {
            if (item.type === ItemTypes.REAL_ESTATE && typeof item.price === 'number') {
                return item.price <= priceTo;
            }
            return true;
        });
    }

    // Фильтрация для авто
    if (req.query.brand) {
        filteredItems = filteredItems.filter(item => {
            if (item.type === ItemTypes.AUTO) {
                return item.brand === req.query.brand;
            }
            return true;
        });
    }
    if (req.query.model) {
        filteredItems = filteredItems.filter(item => {
            if (item.type === ItemTypes.AUTO) {
                return item.model === req.query.model;
            }
            return true;
        });
    }
    if (req.query.yearFrom) {
        const yearFrom = parseInt(req.query.yearFrom, 10);
        filteredItems = filteredItems.filter(item => {
            if (item.type === ItemTypes.AUTO && typeof item.year === 'number') {
                return item.year >= yearFrom;
            }
            return true;
        });
    }
    if (req.query.yearTo) {
        const yearTo = parseInt(req.query.yearTo, 10);
        filteredItems = filteredItems.filter(item => {
            if (item.type === ItemTypes.AUTO && typeof item.year === 'number') {
                return item.year <= yearTo;
            }
            return true;
        });
    }
    if (req.query.mileageFrom) {
        const mileageFrom = parseFloat(req.query.mileageFrom);
        filteredItems = filteredItems.filter(item => {
            if (item.type === ItemTypes.AUTO && typeof item.mileage === 'number') {
                return item.mileage >= mileageFrom;
            }
            return true;
        });
    }
    if (req.query.mileageTo) {
        const mileageTo = parseFloat(req.query.mileageTo);
        filteredItems = filteredItems.filter(item => {
            if (item.type === ItemTypes.AUTO && typeof item.mileage === 'number') {
                return item.mileage <= mileageTo;
            }
            return true;
        });
    }
    if (req.query.priceFrom) {
        // Фильтрация для авто по цене
        const priceFrom = parseFloat(req.query.priceFrom);
        filteredItems = filteredItems.filter(item => {
            if (item.type === ItemTypes.AUTO && typeof item.price === 'number') {
                return item.price >= priceFrom;
            }
            return true;
        });
    }
    if (req.query.priceTo) {
        const priceTo = parseFloat(req.query.priceTo);
        filteredItems = filteredItems.filter(item => {
            if (item.type === ItemTypes.AUTO && typeof item.price === 'number') {
                return item.price <= priceTo;
            }
            return true;
        });
    }

    // Фильтрация для услуг
    if (req.query.serviceType) {
        filteredItems = filteredItems.filter(item => {
            if (item.type === ItemTypes.SERVICES) {
                return item.serviceType === req.query.serviceType;
            }
            return true;
        });
    }
    if (req.query.experience) {
        const experience = parseInt(req.query.experience, 10);
        filteredItems = filteredItems.filter(item => {
            if (item.type === ItemTypes.SERVICES && typeof item.experience === 'number') {
                return item.experience === experience;
            }
            return true;
        });
    }
    if (req.query.schedule) {
        filteredItems = filteredItems.filter(item => {
            if (item.type === ItemTypes.SERVICES && item.schedule) {
                return item.schedule === req.query.schedule;
            }
            return true;
        });
    }
    if (req.query.price && !req.query.priceFrom && !req.query.priceTo) {
        const maxPrice = parseFloat(req.query.price);
        filteredItems = filteredItems.filter(item => {
            if (item.type === ItemTypes.SERVICES && typeof item.price === 'number') {
                return item.price <= maxPrice;
            }
            return true;
        });
    }

    // Пагинация
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const totalCount = filteredItems.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);

    // Возвращаем данные и метаданные пагинации
    res.json({
        data: paginatedItems,
        page,
        limit,
        totalCount,
    });
});

// Получение объявления по его id
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id, 10));
    if (item) {
        res.json(item);
    } else {
        res.status(404).send('Item not found');
    }
});

// Обновление объявления по его id
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id, 10));
    if (item) {
        Object.assign(item, req.body);
        res.json(item);
    } else {
        res.status(404).send('Item not found');
    }
});

// Удаление объявления по его id
app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id, 10));
    if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Item not found');
    }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

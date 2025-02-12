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
let items = [];

const makeCounter = () => {
    let count = 0;
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
                return res
                    .status(400)
                    .json({error: 'Missing required fields for Real estate'});
            }
            break;
        case ItemTypes.AUTO:
            if (!rest.brand || !rest.model || !rest.year) {
                return res
                    .status(400)
                    .json({error: 'Missing required fields for Auto'});
            }
            break;
        case ItemTypes.SERVICES:
            if (!rest.serviceType || !rest.experience || !rest.cost) {
                return res
                    .status(400)
                    .json({error: 'Missing required fields for Services'});
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

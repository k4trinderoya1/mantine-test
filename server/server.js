const galleryFeatures = require('./galleryFeatures.json');
const galleryItems = require('./galleryItems.json');


const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000; // Порт, который вы используете

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Сервер работает!');
});

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

app.get('/api/gallery-items', async (req, res) => {
  await delay(1000); // Задержка в 1 секунду
  try {
    res.json(galleryFeatures);
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});
app.get('/api/gallery-gal', async (req, res) => {
  console.log('Запрос на /api/gallery-gal');
  await delay(1000);
  try {
    console.log('Отправка данных:', galleryItems); // Check if data is logged here
    res.json(galleryItems);
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});



app.listen(port, () => {
  console.log(`Сервер работает на порту ${port}`);
});

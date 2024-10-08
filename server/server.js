const galleryFeatures = require('./galleryFeatures.json');
const galleryItems = require('./galleryItems.json');


const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000; 

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Сервер работает!');
});

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

app.get('/api/gallery-items', async (req, res) => {
  await delay(0); 
  try {
    res.json(galleryFeatures);
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});
app.get('/api/gallery-gal', async (req, res) => {
  console.log('Запрос на /api/gallery-gal');
  await delay(0);
  try {
    console.log('Отправка данных:', galleryFeatures);
    res.json(galleryFeatures);
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});



app.listen(port, () => {
  console.log(`Сервер работает на порту ${port}`);
});

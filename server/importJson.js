const fs = require('fs');
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'database-1.cbiq0ak26tod.eu-north-1.rds.amazonaws.com', 
  user: 'admin',
  password: 'UTMkatherine412',
  port: 3306,
  database: 'database-1',              
});


fs.readFile('C:\\Users\\Lenovo\\projects\\mantine-test\\src\\components\\Gallery\\galleryFeatures.json', 'utf8', (err, data) => {
  if (err) {
      console.error('Ошибка при чтении файла:', err);
      return;
  }


  const jsonData = JSON.parse(data);


  jsonData.forEach(item => {
    const keys = Object.keys(item).join(',');
    const values = Object.values(item).map(value => `'${value}'`).join(',');
    const sql = `INSERT INTO your_table_name (${keys}) VALUES (${values})`;


    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Ошибка выполнения запроса:', err);
      } else {
        console.log('Запись добавлена:', results);
      }
    });
  });


  connection.end();
});

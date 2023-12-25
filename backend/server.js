const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// โหลดข้อมูลจากไฟล์ JSON
function loadJsonData() {
  try {
    const data = fs.readFileSync('data.json');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// บันทึกข้อมูลลงในไฟล์ JSON
function saveJsonData(data) {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
}

// รับข้อมูลจากหน้าเว็บและบันทึกลงใน JSON
app.post('/saveData', (req, res) => {
  const newData = req.body;

  const existingData = loadJsonData();
  existingData.push(newData);

  saveJsonData(existingData);

  res.send('Data recorded successfully');
});

// แสดงข้อมูลทั้งหมดจาก JSON
app.get('/getData', (req, res) => {
  const data = loadJsonData();
  res.json(data);
});

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

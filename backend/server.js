const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());
app.get('/data', (req, res) => {
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the file');
            return;
        }

        const lines = data.trim().split('\n');
        const jsonResult = lines.map(line => {
            const [sweetness, color, fruit] = line.split(',').map(item => item.trim());
            return { sweetness: parseInt(sweetness), color: parseInt(color), fruit: fruit };
        });

        res.json(jsonResult);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
   
});

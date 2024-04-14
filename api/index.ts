import express from 'express';
import fs from 'fs';

const app = express();

app.use(express.json());

const dataFilePath = 'data.txt';

app.get('/save', (req, res) => {
    const content = req.query.content;
    if (!content) {
        return res.status(400).send('Content parameter is missing.');
    }

    fs.appendFile(dataFilePath, content + '\n', err => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).send('Error saving content.');
        }
        res.status(200).send('Content saved successfully.');
    });
});

app.get('/retrieve', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error retrieving content.');
        }
        res.status(200).send(data);
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;
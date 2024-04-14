import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let dataArray: string[] = [];

app.get('/save', (req, res) => {
    const content = req.query.content;
    if (!content) {
        return res.status(400).send('Content parameter is missing.');
    }

    dataArray.push(content as string);
    res.status(200).send('Content saved successfully.');
});

app.get('/retrieve', (req, res) => {
    res.status(200).send(dataArray.join('\n'));
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;
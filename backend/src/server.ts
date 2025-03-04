import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res, next) => {
    res.send('hello world!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

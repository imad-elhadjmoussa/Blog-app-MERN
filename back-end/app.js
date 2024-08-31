require('dotenv').config();
const express = require('express');
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const CORS = require('cors');
const userRouter = require('./routes/users.routes');
const postRouter = require('./routes/posts.routes');
const connectDB = require('./database/cn.db');
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(CORS({
    credentials: true,
    origin: "http://localhost:3000",
}));
app.use(cookieParser());
app.use(express.static('uploads/posts'));
app.use(express.static('uploads/users'));

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use(errorHandler);

connectDB(process.env.MONGO_URL);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
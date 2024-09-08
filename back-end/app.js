require('dotenv').config();
const express = require('express');
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const CORS = require('cors');
const path = require('path');
const userRouter = require('./routes/users.routes');
const postRouter = require('./routes/posts.routes');
const connectDB = require('./database/cn.db');
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(CORS({
    credentials: true,
    origin: "https://blog-app-mern-i7ty.onrender.com",
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'uploads',"posts")));
app.use(express.static(path.join(__dirname, 'uploads',"users")));

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

app.use(errorHandler);

connectDB(process.env.MONGO_URL);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

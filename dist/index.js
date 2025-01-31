import express from 'express';
import dotenv from 'dotenv';
import connect from './config/connect.js';
import router from './routes/userRoutes.js';
const app = express();
app.use(express.json());
dotenv.config();
app.use(router);
connect();
app.listen(process.env.PORT, () => {
    console.log(`server started at port a ${process.env.PORT}`);
});
app.get('/', (req, res) => {
    res.send("welcome to home page");
});

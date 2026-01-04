import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/index.js";
import categoriesRouter from "./routes/categories.js";
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from "cors";
import productsRouter from "./routes/product.js";
import detailRouter from "./routes/detail.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/products/detail', detailRouter);

app.listen(3000, ()=>{
    console.log('Server running on port 3000');
});
import express from "express";
import cors from 'cors'
import API from "./routes/routes.js"

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use('/api', API)

app.listen(port, () => {
    console.log(`servidor rodando em localhost:${port}`)
})
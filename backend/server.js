import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';


//app config
const app = express()
const PORT = 4000

//middleware
app.use(express.json())
app.use(cors())

//DB connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter)

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})

//mongodb+srv://ritukansal456:EHBSFIzmQBmLAJ3k@cluster0.vgqan.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
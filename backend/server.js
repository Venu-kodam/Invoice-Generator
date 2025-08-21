import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoutes.js"
import productRouter from "./routes/productRoutes.js"
import invoiceRouter from "./routes/invoiceRoute.js"


const PORT = process.env.PORT || 4000

const app = express()

app.use(express.json())
app.use(cors({
    origin: "https://invoice-generator-frotend.vercel.app", // <-- your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

connectDB()

//api end points
app.get('/', (req, res) => res.send('API working'))

// Routes
app.use("/api/auth", userRouter);
app.use("/api/products", productRouter);
app.use("/api", invoiceRouter);


app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))



import express from "express"
import { addProduct, getProducts } from "../controllers/productController.js"
import authUser from "../middleware/auth.js"

const productRouter = express.Router()

productRouter.post('/addproduct',authUser, addProduct)
productRouter.get('/fetchproducts',authUser,getProducts)

export default productRouter
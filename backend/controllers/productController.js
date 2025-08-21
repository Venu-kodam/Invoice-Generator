import express from "express";
import productModel from "../models/Product.js";

// Add Product
const addProduct = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        const userId = req.userId;
        if (!name || !price || !quantity) {
            return res.json({ success: false, message: "Missing details" })
        }

        const totalPrice = price * quantity;

        const product = new productModel({ name, price, quantity, totalPrice,user: userId,  });
        await product.save();

        res.json({ success: true, product });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}

// Get all products
const getProducts = async (req, res) => {
    try {
        const userId = req.userId;
        const products = await productModel.find({ user: userId });
        res.json({ success: true, products });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}

export { addProduct, getProducts }


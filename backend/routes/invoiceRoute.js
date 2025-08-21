import express from "express"
import Invoice from "../models/Invoice.js";
import puppeteer from "puppeteer";
import authUser from "../middleware/auth.js";

const invoiceRouter = express.Router()

invoiceRouter.post('/generate-invoice', authUser, async (req, res) => {
    try {
        const { html, products } = req.body;
        const user = req.userId;
        if (!html || !user || !products) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        // 1. Save invoice details in MongoDB
        const newInvoice = new Invoice({
            user,
            products,
            date: new Date(),
        });

        await newInvoice.save();


        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"], // required in many servers (Heroku, Render, Vercel, etc.)
        });
        const page = await browser.newPage();
        const tailwindCDN = `<script src="https://cdn.tailwindcss.com"></script>`;
        await page.setContent(`${tailwindCDN} ${html}`, { waitUntil: "networkidle0" });
        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true
        });
        await browser.close();

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": 'attachment; filename="invoice.pdf"',
        });
        res.send(pdfBuffer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error generating invoice" });
    }
})

export default invoiceRouter
import mongoose from "mongoose"

const InvoiceSchema = new mongoose.Schema({
  user: {
    name: String,
    email: String,
  },
  products: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  subTotal: Number,
  gst: Number,
  total: Number,
  date: String,
});

const Invoice = mongoose.models.Invoice || mongoose.model('Invoice',InvoiceSchema)
export default Invoice
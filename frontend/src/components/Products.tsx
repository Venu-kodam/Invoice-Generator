import React, { useEffect, useState } from 'react'
import ReactDOMServer from "react-dom/server";
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import plus from "../assets/plus.svg"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from './ui/table'
import axios from 'axios'
import { toast } from 'sonner'
import Invoice from './Invoice'
import { useAppContext } from '../Context/appContext';


// product schema for validation
const productSchema = z.object({
    name: z.string().min(2, "Product name must be at least 2 characters"),
    price: z
        .number({ invalid_type_error: "Price must be a number" })
        .positive("Price must be greater than 0"),
    quantity: z
        .number({ invalid_type_error: "Quantity must be a number" })
        .int("Quantity must be an integer")
        .positive("Quantity must be greater than 0"),
});

// Infer TypeScript type
type Product = z.infer<typeof productSchema>;

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [user, setUser] = useState<any>(null);

    const { navigate, API_BASE_URL } = useAppContext()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Product>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            price: 0,
            quantity: 0,
        },
    });

    // Helper to get token safely
    const getToken = () => localStorage.getItem("token");

    //add products
    const onSubmit = async (productdata: Product) => {
        reset(); // reset form after submission
        try {
            const token = getToken()
            if (!token) {
                toast.error("Unauthorized! Please login again.");
                navigate("/login");
                return;
            }

            const { data } = await axios.post(
                `${API_BASE_URL}/products/addproduct`,
                productdata,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data.success && data.product) {
                setProducts([...products, data.product]);
                toast.success("Product added!");
                fetchProducts();
            } else {
                toast.error(data.message || "Failed to add product");
            }
        } catch (err: any) {
            console.error("Add product error:", err);
            toast.error(err.response?.data?.msg || "Failed to add product");
        }
    };

    // fetch user
    const fetchUser = async () => {
        try {
            const token = getToken()
            if (!token) {
                navigate("/login");
                return;
            }
            try {
                const { data } = await axios.post(`${API_BASE_URL}/auth/user`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("Fetched user:", data);
                if (data.success) setUser(data.user);
            } catch (err) {
                console.error("Fetch user error:", err);
            }
        } catch (err) {
            console.error("Failed to fetch user", err);
        }
    };
    // Fetch products
    const fetchProducts = async () => {
        const token = getToken();
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            const { data } = await axios.get(`${API_BASE_URL}/products/fetchproducts`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Fetched products:", data);
            if (data.success) setProducts(data.products ?? []);
        } catch (err) {
            console.error("Fetch products error:", err);
        }
    };

    useEffect(() => {
        fetchUser();
        fetchProducts();
    }, []);


    // subtotal & GST
    const subTotal = (products ?? []).reduce(
        (acc, p) => acc + (p?.price ?? 0) * (p?.quantity ?? 0),
        0
    );

    const gst = subTotal * 0.18;
    const totalWithGst = subTotal + gst;

    const generateInvoice = async () => {
        const token = getToken();
        if (!token) {
            navigate("/login");
            return;
        }

        const html = ReactDOMServer.renderToStaticMarkup(
            <Invoice user={user} products={products} />
        );

        const response = await axios.post(
            `${API_BASE_URL}/generate-invoice`,
            { html, products }, // send full HTML
            {
                headers: {
                    Authorization: `Bearer ${token}`, // 🔑 pass JWT here
                },
                responseType: "blob", // 👈 important: get raw PDF
            }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "invoice.pdf");
        document.body.appendChild(link);
        link.click();
    }

    return (
        <div className='py-8  sm:py-16 px-4 sm:px-8 xl:px-16 bg-black min-h-screen'>
            <h1 className='text-4xl text-white font-bold pt-12'>Add Products</h1>
            <p className='text-[#A7A7A7] py-4 w-[90%] text-base'>This is basic products page which is used for levitation <br /> assignment purpose. </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 sm:grid-cols-3  gap-8'>
                    <div>
                        <Label htmlFor='name' className='text-white text-base my-2'>Product Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter the product name"
                            {...register("name")}
                            className={`bg-[#202020] py-8 border-[#424647] text-white text-xl rounded-sm ${errors.name ? "border-red-500" : ""
                                }`}
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500">{errors.name.message}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor='price' className='text-white text-base my-2'>Product Price</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            placeholder="Enter the price"
                            {...register("price", { valueAsNumber: true })}
                            className={`bg-[#202020] py-8 border-[#424647] text-white text-xl rounded-sm ${errors.price ? "border-red-500" : ""
                                }`}
                        />
                        {errors.price && (
                            <p className="text-xs text-red-500">{errors.price.message}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor='quantity' className='text-white text-base my-2'>Quantity</Label>
                        <Input
                            id="quantity"
                            type="number"
                            placeholder="Enter the Qty"
                            {...register("quantity", { valueAsNumber: true })}
                            className={`bg-[#202020] py-8 border-[#424647] text-white text-xl rounded-sm ${errors.quantity ? "border-red-500" : ""
                                }`}
                        />
                        {errors.quantity && (
                            <p className="text-xs text-red-500">{errors.quantity.message}</p>
                        )}
                    </div>
                </div>
                <div className='flex justify-center  gap-8 items-center my-8'>
                    <Button type='submit' size="lg" className='text-[#CCF575] text-base bg-[#303030] hover:bg-[#303030] rounded-md cursor-pointer  py-6'>
                        Add Product
                        <span><img src={plus} alt="plus-icon" className='' /></span>
                    </Button>
                </div>
            </form>
            {products.length > 0 && (
                <div>
                    <Table className='rounded-xl my-8 border'>
                        <TableHeader className='bg-white/90 hover:bg-white/90 cursor-pointer'>
                            <TableRow className='rounded-2xl'>
                                <TableHead className="font-semibold">Product name</TableHead>
                                <TableHead className="font-semibold">Price</TableHead>
                                <TableHead className="font-semibold">Quantity</TableHead>
                                <TableHead className="font-semibold">Total Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.length > 0 &&
                                products?.map((product, index) => (
                                    <TableRow key={index} className='w-full bg-transparent hover:bg-transparent cursor-pointer text-white'>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                        <TableCell>INR {product.price * product.quantity}</TableCell>
                                    </TableRow>
                                ))
                            }
                            {/* Subtotal */}
                            <TableRow className="text-white">
                                <TableCell colSpan={3} className="text-right">
                                    Sub-Total
                                </TableCell>
                                <TableCell>INR {subTotal.toFixed(2)}</TableCell>
                            </TableRow>

                            {/* GST */}
                            <TableRow className="text-white ">
                                <TableCell colSpan={3} className="text-right">
                                    Incl + GST 18%
                                </TableCell>
                                <TableCell>INR {totalWithGst.toFixed(2)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div className="flex justify-center mt-6">
                        <Button
                            onClick={generateInvoice}
                            className="bg-[#303030] text-[#CCF575] cursor-pointer sm:w-[500px] hover:bg-[#303030] rounded-md py-6 text-base"
                        >
                            Generate PDF Invoice
                        </Button>
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default Products

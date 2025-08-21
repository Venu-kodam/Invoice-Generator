import { format } from "date-fns";
import Logo from "./ui/Logo";

const Invoice = ({ user, products }: any) => {
    const subTotal = products.reduce((acc: number, p: any) => acc + p.price * p.quantity, 0);
    const gst = subTotal * 0.18;
    const total = subTotal + gst;
    const date = new Date()
    const formattedDate = format(date, "dd/MM/yyyy")

    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "16px" }}>
            <div className='px-8'>
                <div className='flex items-center justify-between  border-b py-4 my-4'>
                    <div className='flex items-center gap-2'>
                        <Logo />
                        <div className='text-black'>
                            <p className='text-2xl'>levitation</p>
                            <p className='text-xs'>infotech</p>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-[#0A0A0A] font-semibold'>INVOICE GENERATOR</h1>
                        <p className='text-[#333333] text-sm'>Sample Output should be this </p>
                    </div>
                </div>
                <div style={{
                    backgroundImage: "radial-gradient(circle, #0F0F0F, #303661)",
                    borderRadius: "16px",
                    padding: "16px",
                    margin: "64px 0"
                }}>
                    <div className='flex items-center my-4 justify-between'>
                        <span style={{ color: "#CCCCCCCC" }}>Name</span>
                        <span style={{ color: "#DDDDDD" }}>Date: {formattedDate}</span>
                    </div>
                    <div className='flex items-center justify-between'>
                        <h1 style={{ color: "#CCF575", fontSize: "18px" }}>{user?.name}</h1>
                        <button className="text-black bg-white rounded-full px-4 py-2">{user?.email}</button>
                    </div>
                </div>
                <table style={{ borderCollapse: "collapse" }} className="my-4 w-full ">
                    <thead style={{
                        backgroundImage: "linear-gradient(to right, #303661, #263406)",
                        color: "white"
                    }} >
                        <tr className="rounded-full" style={{ padding: "24px", width: "100%", textAlign: "left" }}>
                            <th style={{
                                fontWeight: 600, padding: "16px",
                                borderTopLeftRadius: "9999px",
                                borderBottomLeftRadius: "9999px"
                            }}>Product</th>
                            <th style={{ fontWeight: 600, padding: "16px" }}>Qty</th>
                            <th style={{ fontWeight: 600, padding: "16px" }}>Rate</th>
                            <th style={{
                                fontWeight: 600, padding: "16px",
                                borderTopRightRadius: "9999px",
                                borderBottomRightRadius: "9999px",
                            }}>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product: any, index: number) => (
                            <tr key={index}
                                style={{
                                    padding: "16px",
                                    color: "#333333",
                                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#fafafa",
                                }} className="rounded-full">
                                <td style={{
                                    padding: "16px",
                                    borderTopLeftRadius: "9999px",
                                    borderBottomLeftRadius: "9999px",
                                }}>{product.name}</td>
                                <td style={{ padding: "16px" }}>{product.quantity}</td>
                                <td style={{ padding: "16px" }}>{product.price}</td>
                                <td style={{
                                    padding: "16px",
                                    borderTopRightRadius: "9999px",
                                    borderBottomRightRadius: "9999px",
                                }}>USD {product.price * product.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ margin: "64px 0" }} className='border w-[400px] flex flex-col gap-2 justify-self-end p-6 border-[#A2A2A2] rounded-xl'>
                    <div className='text-[#0A0A0A8C]  flex justify-between'>
                        <span>Total Charges</span>
                        <span>₹{subTotal.toFixed(2)}</span>
                    </div>
                    <div className='text-[#0A0A0A8C] text-sm flex justify-between'>
                        <span>GST (18%)</span>
                        <span>₹{gst.toFixed(2)}</span>
                    </div>
                    <div className='text-lg font-bold flex justify-between'>
                        <span className='text-black  '>Total Amount</span>
                        <span className='text-[#175EE2]'>₹ {total.toFixed(2)}</span>
                    </div>
                </div>
                <p className='text-[#515151] my-12'>Date: <span className='font-bold'>{formattedDate}</span></p>
                <div
                    className="bg-[#272833] text-white text-sm mx-auto rounded-full px-8 py-4">
                    <p>We are pleased to provide any further information you may require and look forward to assisting with your next order. Rest assured, it will receive our prompt and dedicated attention.</p>
                </div>
            </div >
        </div>
    );
};

export default Invoice;

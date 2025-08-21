import { useEffect, useState } from 'react'
import loginimage1 from "../assets/loginimage1.png"
import loginimage2 from "../assets/loginimage2.jpg"
import logo from "../assets/logo.png"
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import axios from "axios"
import { toast } from 'sonner'
import { useAppContext } from '../Context/appContext'

const images: string[] = [
    loginimage1, loginimage2, loginimage1
];

// Zod schema
const formSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(4, "Password must be at least 4 characters"),
})

// Infer TypeScript type from schema
type FormData = z.infer<typeof formSchema>;

const Login = () => {
    const [current, setCurrent] = useState<number>(0);
    const{navigate,API_BASE_URL} = useAppContext()
    // Auto slide every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (formdata: FormData) => {
        try {
            const { data } = await axios.post(`${API_BASE_URL}/auth/login`, formdata);
            if (data.success) {
                // Save token in localStorage
                localStorage.setItem('token', data.token)
                navigate('/products')
                toast.success("Login successfull")
            }
            else {
                toast.error(data.message)
            }
            
        } catch (err: any) {
            alert(err.response?.data?.msg || "Login failed");
        }
    };


    return (
        <div className='bg-black min-h-screen flex flex-col gap-12 lg:flex-row py-8 sm:py-36 px-4 sm:px-8 xl:px-16'>
            <div className='w-full md:w-[90%] mx-auto lg:w-1/2 rounded-[4rem]'>
                {/* Slider container */}
                <div className="relative w-full  mx-auto overflow-hidden  shadow-lg">
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${current * 80}%)` }}
                    >
                        {images.map((image: string, index: number) => (
                            <div key={index} className="w-[80%] flex-shrink-0 px-8">
                                <img
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-[700px] object-cover rounded-[3rem]"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='w-full md:w-[90%] mx-auto lg:w-1/2 px-4 sm:px-8 xl:px-16'>
                <div className='flex items-center gap-2 '>
                    <img src={logo} alt="logo" className='w-[60px] h-[60px]' />
                    <div className='text-white'>
                        <p className='text-3xl sm:text-4xl'>levitation</p>
                        <p className='text-sm'>infotech</p>
                    </div>
                </div>
                <h1 className='text-3xl sm:text-4xl text-white font-bold pt-12'>Let the Journey Begin!</h1>
                <p className='text-[#A7A7A7] py-4 w-[90%] text-base'>This is basic login page which is used for levitation <br /> assignment purpose. </p>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                    <div>
                        <Label htmlFor='email' className='text-white text-base my-2'>Email Address</Label>
                        <Input id='email' type='email'
                            {...register("email")}
                            placeholder='Enter Email ID'
                            className={`bg-[#202020] py-8 border-[#424647] text-white text-xl rounded-sm ${errors.email ? "border-red-500" : ""}`}
                        />
                        {errors.email && (
                            <p className='text-xs py-2 text-red-500'>{errors.email.message}</p>
                        )}
                        <p className='text-[#A7A7A7] mt-1'>This email will be displayed with your inquiry</p>
                    </div>
                    <div>
                        <Label htmlFor='password' className='text-white text-base my-2'>Current Password</Label>
                        <Input id='password' type='password'
                            {...register("password")}
                            placeholder='Enter the Password'
                            className={`bg-[#202020] py-8 border-[#424647] text-white text-xl rounded-sm ${errors.password ? "border-red-500" : ""}`}
                        />
                        {errors.password && (
                            <p className='text-xs py-2 text-red-500'>{errors.password.message}</p>
                        )}
                        <p className='text-[#A7A7A7] mt-1'>Any further updates will be forwarded on this Email ID</p>
                    </div>
                    <div className='flex gap-8 items-center my-4'>
                        <Button type="submit" size="lg" className='text-[#CCF575] bg-[#303030] hover:bg-[#303030] rounded-md cursor-pointer  py-6'>Login Now</Button>
                        <span className='text-[#A7A7A7] cursor-pointer'>Forget password?</span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login

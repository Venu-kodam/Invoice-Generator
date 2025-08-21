import { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import signupimage from "../assets/signupimage1.png"
import { Button } from './ui/button'
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { toast } from 'sonner'
import { useAppContext } from '../Context/appContext'

// Zod schema
const formSchema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(4, "Password must be at least 4 characters"),
})

// Infer TypeScript type from schema
type FormData = z.infer<typeof formSchema>;

const Signup = () => {
    const{navigate,API_BASE_URL,setToken} = useAppContext()

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (formdata: FormData) => {
        try {
            const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, formdata);
            reset();
            if (data.success) {
                toast.success("Signup successfull")
                setToken(data.token)
                navigate("/products")
            }
            else {
                toast.error(data.message)
            }
            
        } catch (err: any) {
            toast.error(err.response?.data?.msg || "Signup failed");
        }
    };
    return (
        <div className='bg-black flex flex-col-reverse gap-12 lg:flex-row py-8 sm:py-36'>
            <div className='w-full md:w-[90%] mx-auto lg:w-2/5 px-4 sm:px-8 xl:px-16'>
                <h1 className='text-3xl sm:text-4xl text-white font-bold'>Sign up to begin journey</h1>
                <p className='text-[#A7A7A7] py-4 w-[90%] text-base'>This is basic signup page which is used for levitation assignment purpose. </p>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                    <div>
                        <Label htmlFor='name' className='text-white text-base my-2'>Enter your name</Label>
                        <Input id='name'
                            {...register("name")}
                            placeholder='Enter the name'
                            className={`bg-[#202020] py-8 border-[#424647] text-white text-xl rounded-sm ${errors.name ? "border-red-500" : ""}`}
                        />
                        {errors.name && (
                            <p className='text-xs py-1 text-red-500'>{errors.name.message}</p>
                        )}
                        <p className='text-[#A7A7A7] mt-1'>This name will be displayed with your inquiry</p>
                    </div>
                    <div>
                        <Label htmlFor='email' className='text-white text-base my-2'>Email Address</Label>
                        <Input id='email' type='email'
                            {...register("email")}
                            placeholder='Enter Email ID'
                            className={`bg-[#202020] py-8 border-[#424647] text-white text-xl rounded-sm ${errors.email ? "border-red-500" : ""}`}
                        />
                        {errors.email && (
                            <p className='text-xs py-1 text-red-500'>{errors.email.message}</p>
                        )}
                        <p className='text-[#A7A7A7] mt-1'>This email will be displayed with your inquiry</p>
                    </div>
                    <div>
                        <Label htmlFor='password' className='text-white text-base my-2'>Password</Label>
                        <Input id='password' type="password"
                            {...register("password")}
                            placeholder='Enter the Password'
                            className={`bg-[#202020] py-8 border-[#424647] text-white text-xl rounded-sm ${errors.password ? "border-red-500" : ""}`}
                        />
                        {errors.password && (
                            <p className='text-xs py-1 text-red-500'>{errors.password.message}</p>
                        )}
                        <p className='text-[#A7A7A7] mt-1'>Any further updates will be forwarded on this Email ID</p>
                    </div>
                    <div className='flex gap-8 items-center my-4' onClick={()=>navigate('/login')}>
                        <Button type='submit' size="lg" className='text-[#CCF575] bg-[#303030] hover:bg-[#303030] rounded-md cursor-pointer  py-6'>Register</Button>
                        <span className='text-[#A7A7A7] cursor-pointer'>Already have account?</span>
                    </div>
                </form>
            </div>
            <div className='w-full md:w-[90%] mx-auto lg:w-3/5 px-4 sm:px-8 xl:pl-8'>
                <img src={signupimage} alt="signup-image" className='w-full h-full rounded-xl sm:rounded-tl-[4rem] sm:rounded-bl-[4rem]' />
            </div>

        </div>
    )
}

export default Signup

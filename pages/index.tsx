import logo from '../../mynext/components/image/logo-2150297__340.jpg'
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { doRequestGetLogin } from '../redux/action/actionLogin';
import { useRouter } from 'next/router';
import Image from 'next/image';
import AddRegistrasi from './addRegistrasi';
import { FaEyeSlash, FaEye } from 'react-icons/fa'

export default function Login(props: any) {
    type FormValues = {
        name: string;
        pass: string;
    };
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const dispatch = useDispatch();
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)

    const handleLogin = async (data: any) => {
        dispatch(doRequestGetLogin(data))
    }

    const loginState = useSelector((state: any) => state.loginReducers)

    useEffect(() => {
        if (loginState.login) {
            console.log(loginState.login)
            router.push('/home')
        }
    }, [loginState.login, router])

    const handleError = (error: any) => { };

    // const handleSignUp = async () => {
    //     router.push('/user')
    // }

    const registerOptions = {
        name: { required: "Username is required" },
        pass: { required: "Password is required" }
    }

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleLogin, handleError)}>
                <div className="min-h-screen flex justify-center items-center bg-white">
                    <div className="p-10 border-[1px] -mt-10 border-slate-200 rounded-md flex flex-col items-center space-y-3">
                        <div className="py-8">
                            <picture>
                                <Image width={200}
                                    className="-mt-10"
                                    src={logo}
                                    alt="logo" />
                            </picture>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <input className="p-3 border-[1px] border-slate-500 rounded-sm w-80"
                                type="text" placeholder='Username'
                                {...register('name', registerOptions.name)} />
                            <small className="text-danger">
                                {errors?.name && errors.name.message}
                            </small>
                        </div>
                        <div className="flex flex-col space-y-1 relative">
                                <input className="p-3 border-[1px] border-slate-500 rounded-sm w-80"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Password'
                                    {...register('pass', registerOptions.pass)} />
                                <span
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-5 right-2 transform -translate-y-1/2 cursor-pointer"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                                <small className="text-danger">
                                    {errors?.pass && errors.pass.message}
                                </small>
                                <a href='/user' className="font-bold text-[#0070ba]">Forgot password?</a>
                            </div>

                            <div className="flex flex-col space-y-5 w-full">
                                <button className="w-full bg-[#0070ba] rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]">
                                    Login
                                </button>
                                <div className="flex items-center justify-center border-t-[1px] border-t-slate-300 w-full relative">
                                    <div className="-mt-1 font-bod bg-white px-5 absolute">Or</div>
                                </div>
                                <button onClick={() => setIsOpen(true)} className="w-full border-blue-900 hover:border-[#003087] hover:border-[2px] border-[1px] rounded-3xl p-3 
                        text-[#0070ba] font-bold transition duration-200">Sign Up</button>
                            </div>
                            {
                                isOpen ? <AddRegistrasi isOpen={isOpen} closeModal={() => setIsOpen(false)} /> : null
                            }
                        </div>
                    </div>
            </form>
        </div>
    )
}

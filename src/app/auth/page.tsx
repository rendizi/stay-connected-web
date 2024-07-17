'use client'

import React, { FormEvent, useState } from 'react';
import axios from "axios"
import {toast} from "react-toastify"

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [haveAnAccount, setHaveAnAccount] = useState(false)

    const handleClick = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const url = "https://stay-connected-production.up.railway.app/api/v1/"
        try{
            if (!haveAnAccount){
                const response = await axios.post(`${url}register`, {email, password})
                toast(response.data)
            }
            const response = await axios.post(`${url}login`,{email, password})
            toast(response.data?.message)
            localStorage.setItem("token", response.data?.token)
            localStorage.setItem("refresh", response.data?.refresh)
            window.location.href = "/settings"
        }catch (error){
            console.log(error)
            toast("An error occured during the proccess")
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleClick}>
                    <div className='flex flex-col items-center justify-center text-center'>
                        <h2>{haveAnAccount ? "Sign in" :"Sign up"}</h2>
                        <p className='text-center'>{haveAnAccount ? "Sign in with your email and password that you used while signing up" : "Sign up with email and password. They will be used for newsletters and to connect telegram"}</p>
                    </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input 
                                type="email" 
                                placeholder="email" 
                                className="input input-bordered" 
                                required
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input 
                                type="password" 
                                placeholder="password" 
                                className="input input-bordered" 
                                required
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">{haveAnAccount && "Login" || "Register"}</button>
                        </div>
                        <div className="form-control mt-4 text-center">
                            <p className="label-text-alt">
                                <a href="#" className="link link-hover" onClick={()=>setHaveAnAccount(prev => !prev)}>{haveAnAccount && "Don't have an account?" || "Already have an account?"}</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Auth;

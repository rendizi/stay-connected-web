'use client'

import React, { FormEvent, useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
    email?: string;
    sub?: string;
}

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [haveAnAccount, setHaveAnAccount] = useState(false);
    const [loading, setLoading] = useState(false)

    const url = "https://stay-connected-production.up.railway.app/api/v1/";

    const handleClick = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true)
            if (!haveAnAccount) {
                const response = await axios.post(`${url}register`, { email, password });
                toast(response.data);
            }
            const response = await axios.post(`${url}login`, { email, password });
            toast(response.data?.message);
            localStorage.setItem("token", response.data?.token);
            localStorage.setItem("refresh", response.data?.refresh);
            window.location.href = "/mylist";
            setLoading(false)
        } catch (error) {
            console.log(error);
            toast("An error occurred during the process");
            setLoading(false)
        }
    };

    const handleGoogleSuccess = async (email: string, password: string) => {
        try {
            const loginResponse = await axios.post(`${url}login`, { email, password });
            toast(loginResponse.data?.message);
            localStorage.setItem("token", loginResponse.data?.token);
            localStorage.setItem("refresh", loginResponse.data?.refresh);
            window.location.href = "/mylist";
        } catch (error: any) {
            if (error.response.status === 400) {
                try {
                    await axios.post(`${url}register`, { email, password });
                    const loginResponse = await axios.post(`${url}login`, { email,password });
                    toast(loginResponse.data?.message);
                    localStorage.setItem("token", loginResponse.data?.token);
                    localStorage.setItem("refresh", loginResponse.data?.refresh);
                    window.location.href = "/mylist";
                } catch (registerError) {
                    console.log(registerError);
                    toast("An error occurred during the registration process");
                }
            } else {
                console.log(error);
                toast("An error occurred during the Google login process");
            }
        }
    };

    const handleForgotPassword = async () => {
        try {
            setLoading(true)
            const response = await axios.post(
                'https://stay-connected-production.up.railway.app/api/v1/reset',
                {email}
            );
            toast(response.data.message);
            setLoading(false)
        } catch (error: any) {
            toast.error('Error resetting password', error);
            setLoading(false)
        }
    };

    const handleGoogleFailure = (response) => {
        console.log(response);
        toast("Google login failed");
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    
                    <form className="card-body" onSubmit={handleClick}>
                        <div className='flex flex-col items-center justify-center text-center'>
                            <h2>{haveAnAccount ? "Sign in" : "Sign up"}</h2>
                            <div className="form-control mt-4 text-center mb-4">
                                <GoogleLogin
                                    onSuccess={credentialResponse => {
                                            const details= jwtDecode<CustomJwtPayload>(credentialResponse.credential || "");
                                            console.log(details)
                                            console.log(details.email);
                                            handleGoogleSuccess(details.email || "", details.sub || "")
                                    }}
                                    onError={()=>handleGoogleFailure}
                                    containerProps={{ className: 'sign' }}
                                />
                            </div>
                            or
                            <br></br>
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
                            <label className="label">
            {haveAnAccount && <a onClick={()=>{handleForgotPassword()  }} className="label-text-alt link link-hover">Forgot password?</a>}
          </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">
                                {loading ?   <span className="loading loading-spinner"></span> : haveAnAccount ? "Login" : "Register"}
                                </button>
                        </div>
                        <div className="form-control mt-4 text-center">
                            <p className="label-text-alt">
                                <a href="#" className="link link-hover" onClick={() => setHaveAnAccount(prev => !prev)}>{haveAnAccount ? "Don't have an account?" : "Already have an account?"}</a>
                            </p>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    );
}

export default Auth;

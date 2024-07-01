'use client'

import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from 'react-toastify';

const Settings = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLoggedIn(localStorage.getItem("token") !== null);
        }
    }, []);

    const logOut = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    const unlinkInstagram = async () => {
        try {
            console.log("there")
            const resp = await axios.delete("https://stay-connected-production.up.railway.app/api/v1/credentials", {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            toast.success(resp.data.message);
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to unlink Instagram');
        }
    }

    const linkInstagram = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const resp = await axios.put("https://stay-connected-production.up.railway.app/api/v1/credentials", {
                username,
                password
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            toast.success(resp.data.message);
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to link Instagram');
        }
    }

    return (
        <div className="bg-base-200 min-h-screen">
            <Navbar loggedIn={loggedIn} />
            <div className="h-1/2 flex justify-center items-center">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={linkInstagram}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="username" 
                                    className="input input-bordered" 
                                    required 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
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
                                <button className="btn btn-primary" type="submit">Link Instagram</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center mt-4'>
                <button className="btn btn-warning mr-2" onClick={()=>unlinkInstagram()}>Unlink Instagram</button>
                <button className="btn btn-error" onClick={logOut}>Log out</button>
            </div>
        </div>
    );
};

export default Settings;

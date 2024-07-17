'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegPaperPlane } from "react-icons/fa6";
import CardsReviews from './CardsReviews';
import Card from './Card';

interface HeroProps {
    setUsername: (username: string) => void;
}

export default function Hero({ setUsername }: HeroProps) {
    const [user, setUser] = useState("");

    useEffect(() => {
        const modal = document.getElementById("modal_summarize") as HTMLDialogElement | null;
        if (modal?.open) {
            modal?.close()
        }
        const some = async () => {
            try {
                const url = "https://stay-connected-production.up.railway.app/api/v1"
                const response = await axios.post(`${url}/refresh`, null, {
                    headers: {
                        "Authorization": localStorage.getItem("refresh")
                    }
                });
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("refresh", response.data.refresh)
            } catch (error) {
                localStorage.removeItem("token")
                localStorage.removeItem("refresh")
            }
        };
        some()
    }, []);

    const handleClick = () => {
        console.log("Button clicked");
        try {
            setUsername(user);

            const modal = document.getElementById("modal_summarize") as HTMLDialogElement | null;
            if (modal) {
                modal.showModal();
            } else {
                console.error("Modal element not found");
            }
        } catch (error) {
            console.error("Error showing modal:", error);
        }
    };

    return (
        <div>
        <div className="hero bg-base-200 mt-36">
            <div className="hero-content text-center">
                <div className="max-w-md mx-auto">
                    <h1 className="text-5xl font-bold">Summarize Instagram stories</h1>
                    <p className="py-6 px-10 text-xl">
                        Get the latest info in minutes, not <span style={{ display: 'inline-block', transform: 'rotate(-3deg)' }} className="bg-accent px-1 py-1 text-black">hours</span>
                    </p>
                    <a className="btn btn-primary" href="#d">Learn more</a>
                </div>
            </div>
        </div>
        <div className="hero bg-base-200 h-screen" id="d">
            <div className="hero-content flex-col">
            <div className=''>
                <h1 className="text-5xl font-bold text-center" id="f">Features</h1>
                <div className=''>
                    <div className=' bg-base-300 text-primary px-3 py-2 mt-4 text-center text-xl font-semibold'>
                        <h2>Daily stories summarizer</h2>
                        <div className='flex justify-center align-center space-x-2 mt-2 mb-2'>
                        <div className="bg-gray-200 w-40 h-32 rounded-xl pr-2 pl-2 shadow-xl">
                            <div className="flex items-center">
                            <div className="avatar w-6 h-6 rounded-full overflow-hidden mt-2">
                                <img src="n!.jpg" alt="User Avatar" className="object-cover w-full h-full" />
                            </div>
                            <p className="ml-2 text-black text-sm mt-1">@nfactorial</p>
                            </div>
                            <p className="text-black text-xs pr-1 pl-1 mt-2">Free trial lessons on QA engineering available</p>
                        </div> 
                        <div className="bg-gray-200 w-40 h-32 rounded-xl pr-2 pl-2 shadow-xl">
                            <div className="flex items-center">
                            <div className="avatar w-6 h-6 rounded-full overflow-hidden mt-2">
                                <img src="alan.jpg" alt="User Avatar" className="object-cover w-full h-full" />
                            </div>
                            <p className="ml-2 text-black text-sm mt-1">@sevenstragen</p>
                            </div>
                            <p className="text-black text-xs pr-1 pl-1 mt-2">Alan is working on new SaaS that is related with fasion</p>
                        </div> 
                            
                            
                            
                        </div>
                        </div>                   
                    <div className='bg-base-300 text-primary px-3 py-2  mt-4 text-center text-xl font-semibold'>
                        <h2>Recap videos</h2>
                        <p className='text-black dark:text-white text-lg'>Get mini recap video from the most interesting storieses</p>
                    </div>
                    <div className='bg-base-300 text-primary px-3 py-2 mt-4 text-xl text-center font-semibold'>
                        <h2>Get them to your inbox or telegram</h2>
                        <p className='text-black dark:text-white text-lg'>Sign in into <a href="https://t.me/Stay_Connected_Bot" className='text-decoration' type='_blank'><u>telegram newsletter</u></a></p>
                        </div>
                </div>
                </div>
            </div>
            </div>
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
            <FaRegPaperPlane className="max-w-sm rounded-lg text-6xl md:text-6xl lg:text-8xl xl:text-9xl" />
            <div className='p-10'>
                <h1 className="text-5xl font-bold text-center">Time to sign up!</h1>
                <p className="py-6 text-center">Sign up now to start receiving daily summaries of your favorite Instagram profiles straight to your inbox or Telegram!</p>
                <div className='flex justify-center align-center'>
                <a className="btn btn-primary" href="/settings" >Get Started</a>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}

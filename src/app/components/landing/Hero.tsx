'use client'

import { useState, useEffect } from "react";
import axios from "axios";

interface HeroProps {
    setUsername: (username: string) => void;
}

export default function Hero({ setUsername }: HeroProps) {    
    const [user, setUser] = useState("");
    const [token, setToken] = useState("")
    useEffect(() => {
        const modal = document.getElementById("modal_summarize") as HTMLDialogElement | null;
        if (modal?.open) {
            modal?.close()
        }
        setToken(localStorage.getItem("token") || "")
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
        <div className="hero bg-base-200 h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md mx-auto">
                    <h1 className="text-5xl font-bold">Summarize Instagram stories</h1>
                    <p className="py-6 px-10 text-md">
                    Get the latest info in minutes, not <span style={{ display: "inline-block", transform: "rotate(-3deg)" }} className="bg-accent px-1 py-1 text-black">hours</span>
                    </p>
                    <div className='pl-10 pr-10'>
                        <div className="flex justify-center w-full my-4">
                            <label className="input input-bordered flex items-center gap-2 w-full">
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="any instagram username"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                />
                            </label>
                    </div>
                    
                    <button className="btn btn-primary w-full" onClick={handleClick}>Summarize</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

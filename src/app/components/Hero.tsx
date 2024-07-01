'use client'

import React, { useState, useEffect } from 'react';

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
        <div className="hero bg-base-200 h-3/4">
            <div className="hero-content text-center">
                <div className="max-w-md mx-auto">
                    <h1 className="text-5xl font-bold">Summarize Instagram stories</h1>
                    <p className="py-6 px-10 text-xl">
                        Get the latest info in minutes, not <span style={{ display: 'inline-block', transform: 'rotate(-3deg)' }} className="bg-secondary px-1 py-1">hours</span>
                    </p>
                    <div className="flex justify-center w-full my-4">
                        <label className="input input-bordered flex items-center gap-2 w-60 max-w-full">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Username"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                            />
                        </label>
                    </div>
                    <button className="btn btn-primary" onClick={handleClick}>Summarize</button>
                </div>
            </div>
        </div>
    );
}

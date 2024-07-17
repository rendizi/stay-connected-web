'use client'

import React, { useState, useEffect, useRef } from 'react';
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from 'react-toastify';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useRouter } from 'next/navigation';


interface UsersResponse {
    username: string
    profile_pic_url: string 
}

const Settings = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [response, setResponse] = useState<[UsersResponse] | null>(null);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const ws = useRef<WebSocket | null>(null);
    const [addedList, setAddedList] = useState<string[] | null>(null)
    const [connected, setConnected] = useState(true)
    const [url, setUrl] = useState("")
    const router = useRouter();

    const handleWebSocketOpen = () => {
        if (ws.current) {
            ws.current.send(localStorage.getItem("token") || "");
            setConnected(false)
        }
    };

    const handleWebSocketMessage = (event: MessageEvent) => {
        const payload = JSON.parse(event.data)
        console.log(payload)
        const data: [UsersResponse] = payload.data;
        setResponse(data);
        setLoading(false);
    };

    const handleWebSocketClose = () => {
        console.log("WebSocket connection closed");
    };

    const handleWebSocketError = (error: Event) => {
        console.error("WebSocket error:", error);
        setLoading(false);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && ws.current) {
            const trimmedValue = inputValue.trim();
            if (trimmedValue) {
                setLoading(true)
                ws.current.send(trimmedValue);
            }
        }
    };

    const Follow = async(username: string) => {
        try {
            const response = await axios.put(
                "https://stay-connected-production.up.railway.app/api/v1/users",
                [username],
                {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }
            );
    
            setAddedList((prev) => {
                if (prev) {
                    return [...prev, username];
                } else {
                    return [username];
                }
            });
        } catch (err: any) {
            toast.error(err.message || "An error occurred");
        }
    }

    const Unfollow = async (username: string) => {
        try {
            const response = await axios.delete(
                "https://stay-connected-production.up.railway.app/api/v1/users",
                {
                    headers: {
                        "Authorization": localStorage.getItem("token"),
                        "Content-Type": "application/json"
                    },
                    data: [username]
                }
            );
    
            setAddedList((prev) => {
                if (prev) {
                    return prev.filter(user => user !== username);
                } else {
                    return prev;
                }
            });
        } catch (err: any) {
            toast.error(err.message || "An error occurred");
        }
    }
    
    
    

    useEffect(() => {
        if (typeof window !== 'undefined') {
            getAddedList()
            setLoggedIn(localStorage.getItem("token") !== null);
            
            setConnected(true)
            ws.current = new WebSocket('wss://stay-connected-production.up.railway.app/api/v1/users/search');
            ws.current.onopen = handleWebSocketOpen;
            ws.current.onmessage = handleWebSocketMessage;
            ws.current.onclose = handleWebSocketClose;
            ws.current.onerror = handleWebSocketError;

            return () => {
                if (ws.current) {
                    ws.current.close();
                }
            };
        }
    }, []);

    const getAddedList = async() => {
        try{
            const resp = await axios.get("https://stay-connected-production.up.railway.app/api/v1/users", {
                headers: {
                    "Authorization": localStorage.getItem("token")
            }
        })
        setAddedList(resp.data.data);
        console.log(resp.data.data)
        }catch(err: any){
            toast(err)
        }
    }

    const alreadyAdded = (username: string):boolean => {
        if (!addedList){
            console.log("not added list")
            return false 
        }
        for(let i = 0;i<addedList.length;i++){
            console.log(addedList[i])
            if (addedList[i] === username){
                console.log(username)
                return true 
            }
        }
        console.log("not found")
        return false 
    }

    return (
        <div className="bg-base-200 min-h-screen">
            <Navbar />
            <div className='w-full flex flex-col justify-center items-center mt-4'>
            <div className='w-2/3 flex gap-2'>
    <label className="input input-bordered flex items-center gap-2 grow">
        <input
            type="text"
            className="grow"
            placeholder="username"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={connected}
        />
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
        </svg>
    </label>
    <button className='btn btn-accent'>Search</button>
</div>

                {response ?
                 <div className='mt-4'>
                 {response.map((user, index) => (
                <div key={index} className="user-card flex items-center justify-between mt-2">
                    <div className="flex items-center">
                    <div className="avatar online placeholder mr-4">
                        <div className="bg-neutral text-neutral-content w-16 rounded-full">
                        <span className="text-xl">{user.username[0]}</span>
                        </div>
                    </div>
                    <div>{user.username}</div>
                    </div>
                    {user.username && alreadyAdded(user.username) ? 
                    <button className="btn" onClick={()=>Unfollow(user.username)} >
                        <FaHeart />
                    </button> : 
                    <button className="btn" onClick={()=>Follow(user.username)}>
                        <FaRegHeart />
                    </button>}
                </div>
                ))}


               </div>
: loading ? (
    <span className="loading loading-ball loading-lg mt-48"></span>
  ) : (
    <h2 className="mt-4 text-center mt-40 p-20">
      Search for your friends and add them to your list to receive daily summaries of their stories.
    </h2>
  )}
                  <footer className="footer bg-neutral text-neutral-content p-10 flex items-center fixed bottom-0 w-full">
                {addedList && 

                    <div className="avatar-group -space-x-6 rtl:space-x-reverse flex">
                    <div className="avatar online placeholder">
                        <div className="bg-neutral text-neutral-content w-16 rounded-full">
                            <span className="text-xl">{addedList[0] && addedList[0][0]}</span>
                        </div>
                    </div>
                    <div className="avatar online placeholder">
                    <div className="bg-neutral text-neutral-content w-16 rounded-full">
                        <span className="text-xl">{addedList[1] && addedList[1][0]}</span>
                    </div>
                    </div>
                    <div className="avatar online placeholder">
                    <div className="bg-neutral text-neutral-content w-16 rounded-full">
                        <span className="text-xl">{addedList[2] && addedList[2][0]}</span>
                    </div>
                    </div>
                        <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content w-12">
                                <span>+{addedList.length >= 3 && addedList.length - 3 || 0}</span>
                            </div>
                        </div>
                    </div>
}
                    <span className="ml-4">and {addedList && addedList.length >= 3 ? addedList.length - 3 : 0} more friends following</span>
                
                </footer>
            </div>
        </div>
    );
};

export default Settings;

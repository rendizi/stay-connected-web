'use client'

import React, { useState, useEffect, useRef } from 'react';
import Navbar from "../components/landing/Navbar";
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
    const [response, setResponse] = useState<UsersResponse[] | null>(null);
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
        const data: UsersResponse[] = payload.data;
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
            wsSend()
        }
    };

    const wsSend = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue && ws.current) {
            setLoading(true)
            ws.current.send(trimmedValue);
        }
    }

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
            if (localStorage.getItem("token") === null){
                window.location.href = "/"
            }
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

    const convertAddedListToUsersResponse = (): UsersResponse[] => {
        if (!addedList) return [];
        return addedList.map(username => ({
            username,
            profile_pic_url: "photo.png"
        }));
    };

    return (
        <div className="bg-base-200 min-h-screen">
            <Navbar loggedIn={loggedIn}/>
            <div className='w-full flex flex-col justify-center items-center mt-4'>
            <div className='flex gap-2'>
                <div className='join'>
                    <label className="input input-bordered flex items-center gap-2 grow join-item">
                        <input
                            type="text"
                            className="grow"
                            placeholder="username"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={connected}
                        />
                    </label>
                    <button className='btn btn-accent join-item' onClick={()=>wsSend()}>Search</button>
                </div>
            </div>

                {loading ? (
    <span className="loading loading-ball loading-lg mt-48"></span>
  ) : response ?
                 <div className='mt-4'>
                 {response.map((user, index) => (
                <div key={index} className="user-card flex items-center justify-between mt-2">
                    <div className="flex items-center">
                    <div className="avatar placeholder mr-4">
                        <div className="bg-neutral text-neutral-content w-16 rounded-full">
                        <span className="text-xl">{user.username[0]}</span>
                        </div>
                    </div>
                    <div>{user.username}</div>
                    </div>
                    {user.username && alreadyAdded(user.username) ? 
                                            <div className="tooltip" data-tip="Remove from following list">

                    <button className="btn" onClick={()=>Unfollow(user.username)} >
                        <FaHeart className='text-red-500' />
                    </button>
                    </div>
 : 
                        <div className="tooltip" data-tip="Add to following list">

                    <button className="btn" onClick={()=>Follow(user.username)}>
                            <FaRegHeart/>
                    </button>
                    </div>
                }
                </div>
                ))}


               </div>
:  (
    <div>    
        <h2 className="mt-4 text-center mt-40 pr-20 pl-20 pb-10">
        Search for your friends and add them to your list to receive daily summaries of their stories. 
        </h2>
        <p className='text-center pr-20 pl-20'>
        Don't forget to <a href="https://t.me/Stay_Connected_Bot" className='underline text-blue-300' target="_blank">connect your telegram</a> for daily summarizes
        </p>
    </div>
  )}
                  <footer className="footer bg-neutral text-neutral-content p-10 flex items-center fixed bottom-0 w-full">
                {addedList && 
                    
                    <div className="avatar-group -space-x-6 rtl:space-x-reverse flex">
                        {addedList[0] && 
                    <div className="avatar online placeholder">
                        <div className="bg-neutral text-neutral-content w-16 rounded-full">
                            <span className="text-xl">{addedList[0][0]}</span>
                        </div>
                    </div>
}
                    {addedList[1] && 
                    <div className="avatar online placeholder">
                    <div className="bg-neutral text-neutral-content w-16 rounded-full">
                        <span className="text-xl">{addedList[1][0]}</span>
                    </div>
                    </div>
}
{addedList[2] && 
                    <div className="avatar online placeholder">
                    <div className="bg-neutral text-neutral-content w-16 rounded-full">
                        <span className="text-xl">{addedList[2][0]}</span>
                    </div>
                    </div>
}
{addedList.length >= 3 && 
                        <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content w-12">
                                <span>+{addedList.length >= 3 && addedList.length - 3 || 0}</span>
                            </div>
                        </div>
}
                    </div>
}
                    <span className="ml-4">and {addedList && addedList.length >= 3 ? addedList.length - 3 : 0} more 
                    <span onClick={(e)=>{
                        e.preventDefault();
                        setResponse(convertAddedListToUsersResponse())
                    }} className="underline ml-1 text-blue-300">
                    friends following
                    </span>
                    </span>
                
                </footer>
            </div>
        </div>
    );
};

export default Settings;

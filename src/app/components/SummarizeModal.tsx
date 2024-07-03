'use client'

import React, { useEffect, useState } from 'react';

const SummarizeModal = ({username}:{username: string}) => {
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false)
    const [needSignIn, setNeedSignIn] = useState(false)

    useEffect(() => {
        if (username === ""){
            setResponse("username is invalid")
            return 
        }
        const ws = new WebSocket('wss://stay-connected-production.up.railway.app/');

        ws.onopen = () => {
            console.log('WebSocket connected');
            ws.send(localStorage.getItem("token") || "")
            ws.send(username);
            setResponse("")
            setLoading(true)
        };

        ws.onmessage = (event) => {
            console.log('Message from server:', event.data);
            if (event.data === "You need to sign in first"){
                setNeedSignIn(true)
            }
            setResponse(event.data);
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
            setLoading(false)
        };

        ws.onerror = (error) => {
            console.log('WebSocket error:', error);
            setLoading(false)
        };

        return () => {
            ws.close();
        };
    }, [username]);

    return (
        <dialog id="modal_summarize" className="modal" open>
    <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Summarizer</h3>
        
        <div className="flex flex-col items-center justify-center py-4">
            {response && <p className="py-4">{response}</p>}
            {loading && <span className="loading loading-spinner loading-lg"></span>}
            {needSignIn && <a href="/auth" className='btn btn-secondary'>Sign in</a>}
        </div>
    </div>
    
    <form method="dialog" className="modal-backdrop">
        <button className="btn-close">Close</button>
    </form>
</dialog>

    );
};

export default SummarizeModal;

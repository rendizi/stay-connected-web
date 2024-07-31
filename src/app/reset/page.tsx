'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('https://stay-connected-production.up.railway.app/api/v1/verify', 
            { password },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                }
            });

            if (response.status === 200) {
                toast("password updated successfully")
                window.location.href = "/"
            }
        } catch (error) {
            toast.error("error updating password")
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">New password</span>
                            </label>
                            <input 
                                type="password" 
                                placeholder="enter new password" 
                                className="input input-bordered" 
                                required 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

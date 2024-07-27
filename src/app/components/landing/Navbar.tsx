'use client'

import { log } from "console"
import { useEffect } from "react"
import { FiLogOut, FiList } from "react-icons/fi"

interface NavbarProps {
    loggedIn: boolean
}

const Navbar = ({ loggedIn }: NavbarProps) => {
    useEffect(() => {
        console.log(loggedIn)
    }, [loggedIn])

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl" href="/">stay connected</a>
            </div>
            <div className="navbar-end">
                {loggedIn ? 
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow right-0">
                        <li>
                            <a href="/mylist">
                                <FiList className="mr-2" />
                                My Followings
                            </a>
                        </li>
                        <li>
                            <a onClick={() => {
                                localStorage.removeItem("refresh")
                                localStorage.removeItem("token")
                                window.location.href = "/"
                            }}>
                                <FiLogOut className="mr-2 text-red-500" />
                                Log Out
                            </a>
                        </li>
                    </ul>
                </div> : 
                <button className="btn btn-primary" onClick={()=>window.location.href="/auth"}>Sign up</button>}
            </div>
        </div>
    )
}

export default Navbar

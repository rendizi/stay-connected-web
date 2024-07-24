'use client'

import { useEffect } from "react"

interface NavbarProps{
    loggedIn: boolean
}

const Navbar = ({loggedIn}:NavbarProps) => {
    useEffect(()=>{
        console.log(loggedIn)
    }, [loggedIn])


    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl" href="/">stay connected</a>
            </div>
            <div className="navbar-center hidden lg:flex">
            </div>
            <div className="navbar-end">
                {loggedIn === true && 
             <a className="btn" href="/settings">Settings</a> ||
             <a className="btn btn-secondary" href="/auth">Sign Up</a>
}
            </div>
        </div>
    )
}

export default Navbar
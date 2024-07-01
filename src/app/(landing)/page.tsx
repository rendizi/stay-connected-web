'use client'

import Image from "next/image";
import Hero from "../components/Hero";
import SummarizeModal from "../components/SummarizeModal";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Index() {
  const [username, setUsername] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if (token){
      setLoggedIn(true)
    }
  },[])

  return (
    <div className="h-screen bg-base-200">
      <Navbar loggedIn={loggedIn}/>
      <Hero setUsername={setUsername}/>
      <SummarizeModal username={username}/>
    </div>
  );
}

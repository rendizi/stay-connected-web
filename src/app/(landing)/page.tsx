'use client'

import Image from "next/image";
import Hero from "../components/Hero";
import SummarizeModal from "../components/SummarizeModal";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Index() {
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    let modifiedUsername = username;
  
    if (modifiedUsername[0] === "@") {
      modifiedUsername = modifiedUsername.slice(1);
    }
    
    modifiedUsername = modifiedUsername.trim();
    
    setUsername(modifiedUsername);
  }, [username]);

  return (
    <div className="bg-base-200">
      <Navbar loggedIn={loggedIn} />
      <Hero setUsername={setUsername} />
      <SummarizeModal username={username} />
    </div>
  );
}

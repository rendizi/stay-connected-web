'use client'

import { useState, useEffect } from "react";
import Hero from "./components/landing/Hero";
import Features from "./components/landing/Features";
import type { NextPage } from "next";
import Navbar from "./components/landing/Navbar";
import Action from "./components/landing/Action";
import SummarizeModal from "./components/landing/SummarizeModal";

const Page: NextPage = () => {
  const [username, setUsername] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    let modifiedUsername = username;

    if (modifiedUsername[0] === "@") {
      modifiedUsername = modifiedUsername.slice(1);
    }

    modifiedUsername = modifiedUsername.trim().toLowerCase();

    setUsername(modifiedUsername);
  }, [username]);

  return (
    <div className="bg-base-200 min-h-screen">
      <Navbar loggedIn={loggedIn}/>
      <Hero setUsername={setUsername} />
      <div className="flex justify-center items-center py-8">
        <div className="w-3/4 max-w-4xl">
          <div className="flex justify-center mb-10">
            <h2 className="text-3xl font-bold">Features</h2>
          </div>
          <Features />
        </div>
      </div>
      <Action />
    <SummarizeModal username={username}/>
    </div>
  );
};

export default Page;

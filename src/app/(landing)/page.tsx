'use client'

import Image from "next/image";
import Hero from "../components/Hero";
import SummarizeModal from "../components/SummarizeModal";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Index() {
  const [username, setUsername] = useState("")

  return (
    <div className="h-screen bg-base-200">
      <Navbar />
      <Hero setUsername={setUsername}/>
      <SummarizeModal username={username}/>
    </div>
  );
}

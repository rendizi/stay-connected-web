'use client'

import Image from "next/image";
import Hero from "../components/Hero";
import SummarizeModal from "../components/SummarizeModal";
import { useState } from "react";

export default function Index() {
  const [username, setUsername] = useState("")

  return (
    <div>
      <Hero setUsername={setUsername}/>
      <SummarizeModal username={username}/>
    </div>
  );
}

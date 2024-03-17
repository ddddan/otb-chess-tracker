'use client';

import { useState } from 'react';
 
import Image from "next/image";
import InputFileSelect from "@/app/ui/InputFileSelect";

export default function Home() {  
  const [showGameTable, setShowGameTable] = useState(false);

  function onShowGameTable() {
    setShowGameTable(true);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">      
      <div className="flex flex-col items-center justify-between p-6">
        <InputFileSelect onShowGameTable={() => {onShowGameTable}} />        
      </div>

      
    </main>
  );
}

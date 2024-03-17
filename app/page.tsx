'use client';

import { useState } from 'react';
 
import Image from "next/image";
import InputFileSelect from "@/app/ui/InputFileSelect";
import GameTable from '@/app/ui/GameTable';

export default function Home() {  
  const [showGameTable, setShowGameTable] = useState(false);

  function handleShowGameTable() {
    setShowGameTable(true);
    alert("Hello, world!");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">      
      <div className="flex flex-col items-center justify-between p-6">
        <InputFileSelect onShowGameTable={handleShowGameTable} />
        { showGameTable && <GameTable gameData={null} />}
      </div>

      
    </main>
  );
}

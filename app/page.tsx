'use client';

import { useState } from 'react';
 
import Image from "next/image";
import InputFileSelect from "@/app/ui/InputFileSelect";
import GameTable from "@/app/ui/GameTable";
import { importPGN } from "@/app/lib/dataProcessing";

export default function Home() {  
  const [showGameTable, setShowGameTable] = useState(false);
  const [gameList, setGameList] = useState([]);

  const handleSelectFile = async (file) => {
    const initialGameList = await importPGN(file);
    setGameList(initialGameList);
    setShowGameTable(true);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">      
      <div className="flex flex-col items-center justify-between p-6">
        <InputFileSelect onSelectFile={handleSelectFile} />
        { showGameTable && <GameTable gameList={gameList} />}
      </div>

      
    </main>
  );
}

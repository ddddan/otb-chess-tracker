'use client';

import { useState } from 'react';
 
import Image from "next/image";
import InputFileSelect from "@/app/ui/InputFileSelect";
import GameTable from "@/app/ui/GameTable";
import { importPGN, getWinLossByQuarter, getWinLossByColour, getWinLossByColourECO } from "@/app/lib/dataProcessing";
import WinLossByQuarterChart from './ui/WinLossByQuarterChart';

/****/
const initialUserName = 'Mullin, Daniel'; // :)
/****/

export default function Home() {  
  const [showResults, setShowResults] = useState(false);
  const [gameList, setGameList] = useState([]);
  const [userName, setUserName] = useState(initialUserName);
  const [winLossByQuarter, setWinLossByQuarter] = useState({});

  const handleSelectFile = async (file: string) => {
    const initialGameList = await importPGN(file, userName);
    setGameList(initialGameList); 
    
    const initialWinLossByQuarter = getWinLossByQuarter(gameList, userName);
    setWinLossByQuarter(initialWinLossByQuarter);

    setShowResults(true);
  }



  return (
    <main className="flex min-h-screen flex-col items-center p-24">      
      
    <InputFileSelect onSelectFile={handleSelectFile} />            
    { showResults && 
      <>
      <GameTable gameList={gameList} />
      <WinLossByQuarterChart winLossByQuarter={winLossByQuarter} />
      </>
    }
    </main>
  );
}

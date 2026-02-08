'use client';

import React, { useState } from 'react';
 
import Image from "next/image";
import InputFileSelect from "@/app/ui/InputFileSelect";
import GameTable from "@/app/ui/GameTable";
import { importPGN, getWinLossByQuarter, getWinLossByColour, getWinLossByColourECO, getWinLossByQuarterRD } from "@/app/lib/dataProcessing";
import WinLossByQuarterChart from './ui/WinLossByQuarterChart';
import WinLossByColourChart from './ui/WinLossByColourChart';
import WinLossByColourECOChart from './ui/WinLossByColourECOChart';
import WinLossByQuarterRDChart from './ui/WinLossByQuarterRDChart';

/****/
const initialUserName = 'Mullin, Daniel'; // :)
/****/

export default function Home() {  
  const [showResults, setShowResults] = useState(false);
  const [gameList, setGameList] = useState([]);
  const [userName, setUserName] = useState(initialUserName);
  const [winLossByQuarter, setWinLossByQuarter] = useState({});
  const [winLossByColour, setWinLossByColour] = useState({});
  const [winLossByColourECO, setWinLossByColourECO] = useState({});
  const [winLossByQuarterRD, setWinLossByQuarterRD] = useState({});

  const handleSelectFile = async (file: File) => {
    const initialGameList = await importPGN(file, userName);
    setGameList(initialGameList); 
    
    const initialWinLossByQuarter = getWinLossByQuarter(initialGameList, userName);
    setWinLossByQuarter(initialWinLossByQuarter);

    const initialWinLossByColour = getWinLossByColour(initialGameList, userName);
    setWinLossByColour(initialWinLossByColour);

    const initialWinLossByColourECO = getWinLossByColourECO(initialGameList, userName);
    setWinLossByColourECO(initialWinLossByColourECO);

    const initialWinLossByQuarterRD = getWinLossByQuarterRD(initialGameList, userName);
    setWinLossByQuarterRD(initialWinLossByQuarterRD);

    setShowResults(true);
  }



  return (
    <main className="flex min-h-screen flex-col items-center p-24">      
      
    <InputFileSelect onSelectFile={handleSelectFile} />            
    { showResults && 
      <>
      <GameTable gameList={gameList} />
      <WinLossByQuarterChart winLossByQuarter={winLossByQuarter} />
      <WinLossByColourChart winLossByColour={winLossByColour} />
      <WinLossByColourECOChart winLossByColourECO={winLossByColourECO} colour="White" />
      <WinLossByColourECOChart winLossByColourECO={winLossByColourECO} colour="Black" />
      <WinLossByQuarterRDChart winLossByQuarterRD={winLossByQuarterRD} />
      </>
    }
    </main>
  );
}

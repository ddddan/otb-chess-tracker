'use client';

import { useState, ChangeEvent } from 'react';
import { parse }  from 'pgn-parser';

interface InputFileSelectProps {
    onSelectFile: (file: File) => void;
}

export default function InputFileSelect({ onSelectFile }: InputFileSelectProps) {    
    const [errorMessage, setErrorMessage] = useState('');

    const handlefileChange = (e: ChangeEvent<HTMLInputElement>) => {        
        const file = e.target.files?.[0];
        if (file && file.name.endsWith(".pgn")) {
            setErrorMessage('');
            onSelectFile(file);
        } else {
            setErrorMessage("Please select a valid PGN file.");
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto my-3 bg-white rounded-xl shadow-lg flex items-center space-x-4">
            <label htmlFor = "pgnFile">Import PGN:</label>
            <input className="border-black" type="file" id="pgnFile" accept=".pgn" onChange={handlefileChange} />
            { errorMessage && <p className="error">{errorMessage}</p> }
        </div>
        
    );
}
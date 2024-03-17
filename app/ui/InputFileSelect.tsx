'use client';

import { useState } from 'react';
import { parse }  from 'pgn-parser';

export default function InputFileSelect({ onSelectFile }) {    
    const [errorMessage, setErrorMessage] = useState('');

    const handlefileChange = (e) => {        
        const file = e.target.files[0];
        if (file && file.name.endsWith(".pgn")) {
            setErrorMessage('');
            onSelectFile(file);
        } else {
            setErrorMessage("Please select a valid PGN file.");
        }
    };

    return (
        <div className="pgn-import">
            <label htmlFor = "pgnFile">Import PGN:</label>
            <input type="file" id="pgnFile" accept=".pgn" onChange={handlefileChange} />
            { errorMessage && <p className="error">{errorMessage}</p> }
        </div>
        
    );
}
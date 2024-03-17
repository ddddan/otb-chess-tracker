'use client';

import { useState } from 'react';
import { parse }  from 'pgn-parser';

export default function InputFileSelect({ onShowGameTable }) {    

    const handlefileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const pgnData = e.target.result.toString();
                const games = parse(pgnData);
                onShowGameTable();
            };
            reader.readAsText(file);            
        } else {
            alert("Please select a valid PGN file.");
        }
    };

    return (
        <div className="pgn-import">
            <label htmlFor = "pgnFile">Import PGN:</label>
            <input type="file" id="pgnFile" accept=".pgn" onChange={handlefileChange} />
        </div>
    );
}
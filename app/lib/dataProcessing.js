import { parse } from 'pgn-parser';

const fs = require('node:fs');

export function importPGN(filePath) {
    let data = '';
    try {
        data = fs.readFileSync(filePath);
    } catch (err) {
        console.error("importPGN: Could not read file '" + filePath +'"');
    }
    return data;
}

export function parseGames(data) {
    const games = parse(data);    
    return games;
}
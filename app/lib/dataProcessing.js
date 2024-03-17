import { parse } from 'pgn-parser';

export async function importPGN(filePath) {

    const reader = new FileReader();

    return new Promise((resolve) => {
        reader.onload = (e) => {
            const pgnData = e.target.result.toString();
            const games = parse(pgnData);
            resolve(games);
        }
        reader.readAsText(filePath);            
    });    
}

export function parseGames(data) {
    const games = parse(data);    
    return games;
}
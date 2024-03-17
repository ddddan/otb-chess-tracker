import { parse } from 'pgn-parser';

export async function importPGN(filePath) {

    const reader = new FileReader();

    return new Promise((resolve) => {
        reader.onload = (e) => {
            const pgnData = e.target.result.toString();
            const games = parseGames(pgnData);
            resolve(games);
        }
        reader.readAsText(filePath);            
    });    
}

function parseGames(pgnData) {
    let games = parse(pgnData);
    // Append IDs
    for(let i = 0; i < games.length; i++) {
        games[i].id = i;
    }
    return games;
 }

export const headerMap = [
    {name: 'White Player', isName: true, sourceHeader: 'White'},
    {name: 'White ELO', isName: false, sourceHeader: 'WhiteElo'},
    {name: 'Black Player', isName: true, sourceHeader: 'Black'},
    {name: 'Black ELO', isName: false, sourceHeader: 'BlackElo'},
    {name: 'Date', isName: false, sourceHeader: 'Date'},
    {name: 'Event', isName: true, sourceHeader: 'Event'},
    {name: 'Round', isName: false, sourceHeader: 'Round'},
    {name: 'Site', isName: true, sourceHeader: 'Site'},
    {name: 'Result', isName: false, sourceHeader: 'Result'},
    {name: 'ECO', isName: false, sourceHeader: 'ECO'},
]

export function tabulateGames(headers, gameList) {
    let tabGames = [];
    for(let i = 0; i < gameList.length; i++) {
        // Each game will have the id and list of tags
        let tabGame = {
            id : gameList[i].id, 
            tags: []
        };
        for (let j = 0; j < headers.length; j++) {
            const headerField = gameList[i].headers.find(field => field.name == headers[j].sourceHeader);
            if (!headerField) {
                tabGame.tags.push('');
            } else {
                tabGame.tags.push(headerField.value);
            }
            
        }
        tabGames.push(tabGame);
    }
    return tabGames;
}
import { parse } from 'pgn-parser';
import * as ecoData from './eco.json';

// This will be loaded the first time 
var ecoLookup = {};

export async function importPGN(filePath, userName) {

    const reader = new FileReader();

    return new Promise((resolve) => {
        reader.onload = (e) => {
            const pgnData = e.target.result.toString();
            const games = parseGames(pgnData, userName);
            resolve(games);
        }
        reader.readAsText(filePath);            
    });    
}

function parseGames(pgnData, userName) {
    let games = parse(pgnData);
    // Append IDs
    for(let i = 0; i < games.length; i++) {
        games[i].id = i;
        games[i].result = getGameResult(games[i], userName);
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
            id: gameList[i].id, 
            tags: [],
            result: gameList[i].result
        };
        for (let j = 0; j < headers.length; j++) {
            const headerField = gameList[i].headers.find(field => field.name === headers[j].sourceHeader);
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

function getMinMaxDates(games) {
    let result = {
        minDate: new Date(),
        maxDate: new Date(0)
    };

    games.forEach(game => {
        const dateField = game.headers.find(header => header.name === 'Date');
        const date = new Date(dateField.value);
        if (date < result.minDate) {
            result.minDate = date;
        }
        if ( date > result.maxDate) {
            result.maxDate = date;
        }
    });
    return result;
}

function getIsUserWhite(game, userName) {
    const whitePlayerHeader = game.headers.find(header => header.name === 'White');
    return whitePlayerHeader.value === userName;
}

function getGameResult(game, userName) {
    const gameResultHeader = game.headers.find(header => header.name === 'Result');
        const gameResult = gameResultHeader.value;
        const isUserWhite = getIsUserWhite(game, userName);

        if (gameResult === '1/2-1/2') { // Draw
            return 'draw';
        } else if (gameResult === '1-0' && isUserWhite || gameResult === '0-1' && !isUserWhite) { // Win
            return 'win';
        } else { // Loss  | /| || |_
            return 'loss';
        }
}

export function getWinLossByQuarter(games, userName) {
    const winLossByQuarter = {};

    games.forEach(game => {
        const gameDateHeader = game.headers.find(header => header.name === 'Date');
        const gameDate = new Date(gameDateHeader.value);
        const quarter = gameDate.getFullYear().toString() + "Q" + Math.floor((gameDate.getMonth() + 3) / 3).toString();

        // Initialize entry for the quarter if it doesn't exist
        if (!winLossByQuarter[quarter]) {
            winLossByQuarter[quarter] = { wins: 0, losses: 0, draws: 0};
        }

        // Update win/loss/draw counts based on games result
        const gameResult = getGameResult(game, userName);        
        if (gameResult === 'draw') { 
            winLossByQuarter[quarter].draws++;
        } else if (gameResult === 'win') { 
            winLossByQuarter[quarter].wins++;
        } else { 
            winLossByQuarter[quarter].losses++;
        }
    });
    return winLossByQuarter;
}

export function getWinLossByColour(games, userName) {
    const winLossByColour = {};

    games.forEach(game => {
        const isUserWhite = getIsUserWhite(game, userName);
        const colour = isUserWhite ? 'White' : 'Black';

        // Initialize entry for the quarter if it doesn't exist
        if (!winLossByColour[colour]) {
            winLossByColour[colour] = { wins: 0, losses: 0, draws: 0};
        }

        // Update win/loss/draw counts based on games result
        const gameResult = getGameResult(game, userName);        
        if (gameResult === 'draw') { 
            winLossByColour[colour].draws++;
        } else if (gameResult === 'win') { 
            winLossByColour[colour].wins++;
        } else { 
            winLossByColour[colour].losses++;
        }
    });
    return winLossByColour;
}

export function getWinLossByColourECO(games, userName) {
    const winLossByColourECO = { White: {}, Black: {} };

    games.forEach(game => {
        const isUserWhite = getIsUserWhite(game, userName);
        const colour = isUserWhite ? 'White' : 'Black';

        // ECO = Encyclopedia of Chess Openings code
        // TODO: Implement matching moves in json
        const ecoField = game.headers.find(header => header.name === 'ECO');
        if (!ecoField) {
            return; // only tabulate if valid ECO present
        }
        const eco = ecoField.value;

        // Initialize entry for the quarter if it doesn't exist
        if (!winLossByColourECO[colour].hasOwnProperty(eco)) {
            winLossByColourECO[colour][eco] = { wins: 0, losses: 0, draws: 0};
        }

        // Update win/loss/draw counts based on games result
        const gameResult = getGameResult(game, userName);        
        if (gameResult === 'draw') { 
            winLossByColourECO[colour][eco].draws++;
        } else if (gameResult === 'win') { 
            winLossByColourECO[colour][eco].wins++;
        } else { 
            winLossByColourECO[colour][eco].losses++;
        }
    });
    return winLossByColourECO;
}

export function getOpeningFromECO(eco) {
    // Create the lookup if does not exist
    if (Object.keys(ecoLookup).length === 0) {
        populateEcoLookup();
    }
    if (ecoLookup.hasOwnProperty(eco)) {
        return ecoLookup[eco];
    } else {
        return "<Unknown>";
    }
    
}

function populateEcoLookup() {
    // NOTE: This keeps only the "a" or unspecified SCID codes for simplicity
    for(let i = 0; i < ecoData.length; i++) {
        const eco = ecoData[i].eco;
        const scidEco = ecoData[i].scid;
        if (!ecoLookup[eco] && !!scidEco && (scidEco.length == 3 || scidEco.endsWith('a') )) {
            ecoLookup[eco] = ecoData[i].name;
        }
    }
}
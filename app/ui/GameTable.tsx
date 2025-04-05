
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { getOpeningFromECO, headerMap, tabulateGames } from '../lib/dataProcessing';


interface Game {
    id: string;
    tags: string[];
    opening?: string;
}

interface GameTableProps {
    gameList: Game[];
}

export default function GameTable({ gameList }: GameTableProps) {
    const initialGames = tabulateGames(headerMap, gameList);
    const [tabGames, setTabGames] = useState(initialGames); 

    const initialColumns = headerMap;

    return (
        <div className="game-table">
            <Tooltip place="right" id="eco-tooltip" />
            <table>
                <thead>
                    <tr>
                        {initialColumns.map((column, i) => 
                            <th key={i} className={column.isName ? 'name': ''}>{column.name}</th>                        
                        )} 
                    </tr>
                </thead>
                <tbody>
                    {tabGames.map(game => 
                        <tr key={game.id}>
                            {game.tags.map((tag, i) => 
                            <>
                                { headerMap[i].name === "ECO" ?
                                <td 
                                    key={i} 
                                    className={headerMap[i].isName ? 'name' : ''}
                                    data-tooltip-id="eco-tooltip" 
                                    data-tooltip-content={tag + ': ' + game.opening}>
                                        {tag}                                
                                </td>
                                : 
                                <td 
                                 key={i} 
                                 className={headerMap[i].isName ? 'name' : ''}>
                                        {tag}                                
                                </td>
                                }
                              </>                                      
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    );

}

import { useState } from 'react';
import { headerMap, tabulateGames } from '../lib/dataProcessing';

export default function GameTable({gameList}) {
    const initialGames = tabulateGames(headerMap, gameList);
    const [tabGames, setTabGames] = useState(initialGames); 

    const initialColumns = headerMap;

    return (
        <div className="game-table">
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
                                <td key={i} className={headerMap[i].isName ? 'name' : ''}>{tag}</td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    );

}
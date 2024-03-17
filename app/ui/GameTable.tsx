
const initialColumns = [
    {name: 'White Player', isName: true},
    {name: 'White ELO', isName: false},
    {name: 'Black Player', isName: true},
    {name: 'Black ELO', isName: false},
    {name: 'Date', isName: false},
    {name: 'Event', isName: true},
    {name: 'Round', isName: false},
    {name: 'Location', isName: true},
    {name: 'Result', isName: false},
    {name: 'ECO', isName: false},
];

export default function GameTable({gameList}) {

    return (
        <div className="game-table">
            <table>
                <thead>
                    <tr>
                        {initialColumns.map((column, i) => 
                            <th key="i" className={column.isName ? 'name': ''}>{column.name}</th>                        
                        )} 
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Hello, World!</td>
                    </tr>
                </tbody>
            </table>
        </div>

    );

}

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export default function WinLossByQuarterChart({winLossByQuarter}) {
    
    const labels = Object.keys(winLossByQuarter);
    const winsData = Object.values(winLossByQuarter).map(q => q.wins);
    const drawsData = Object.values(winLossByQuarter).map(q => q.draws);
    const lossesData = Object.values(winLossByQuarter).map(q => q.losses);

    const options = {
        plugins: { 
            title: { 
                display: true,
                text: 'Results by Quarter',
            }
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,                
            },
            y: {
                stacked: true,
            }
        }
    };

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Losses',
                data: lossesData,
                backgroundColor: ['rgba(255, 128, 128, 0.5'],                
            },
            {
                label: 'Draws',
                data: drawsData,
                backgroundColor: ['rgba(128, 128, 128, 0.5'],                
            },
            {
                label: 'Wins',
                data: winsData,
                backgroundColor: ['rgba(128, 255, 128, 0.5'],                
            }

        ]
    }

    return (
        <div style={{width: 800, height: 400, backgroundColor: 'white', padding: '1em', marginTop: '1em', border: '1px solid lightgray'}}>
        { /* <div className="container lg p-6 mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4"> */ }
            <Bar 
                data={data}
                options={options}
            />
        </div>
    );
}

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

export default function WinLossByColourECOChart({winLossByColourECO, colour}) {
   
    const labels = Object.keys(winLossByColourECO[colour]);
    const winsData = Object.values(winLossByColourECO[colour]).map(q => q.wins);
    const drawsData = Object.values(winLossByColourECO[colour]).map(q => q.draws);
    const lossesData = Object.values(winLossByColourECO[colour]).map(q => q.losses);

    const options = {
        plugins: { 
            title: { 
                display: true,
                text: 'Results by ECO (' + colour + ')',
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
                backgroundColor: ['rgba(255, 128, 128, 0.9'],                
            },
            {
                label: 'Draws',
                data: drawsData,
                backgroundColor: ['rgba(128, 128, 128, 0.9'],                
            },
            {
                label: 'Wins',
                data: winsData,
                backgroundColor: ['rgba(128, 255, 128, 0.9'],                
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
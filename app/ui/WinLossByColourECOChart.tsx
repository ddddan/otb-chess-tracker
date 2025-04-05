
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    TooltipItem,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getOpeningFromECO } from '../lib/dataProcessing';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

interface WinLossData {
    wins: number;
    draws: number;
    losses: number;
}

interface WinLossByColourECO {
    [colour: string]: {
        [eco: string]: WinLossData;
    };
}

export default function WinLossByColourECOChart({winLossByColourECO, colour}: { winLossByColourECO: WinLossByColourECO; colour: string }) {

    const sortedKeys = Object.keys(winLossByColourECO[colour]).sort();
    const sortedData = sortedKeys.map(key => winLossByColourECO[colour][key]);
       
    const labels = sortedKeys;
    const winsData = sortedData.map(c => c.wins);
    const drawsData = sortedData.map(c => c.draws);
    const lossesData = sortedData.map(c => c.losses);

    const options = {
        plugins: { 
            title: { 
                display: true,
                text: 'Results by ECO (' + colour + ')',
            },
            tooltip: {
                callbacks: {
                    title: function(context: TooltipItem<'bar'>[]) {                        
                        let title = context[0].label || '';

                        const opening = getOpeningFromECO(title);

                        return title + ": " + opening;
                    }
                }
            }
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,                
            },
            y: {
                stacked: true,
                ticks: {
                    stepSize: 1
                }
            },
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
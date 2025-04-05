
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

interface QuarterData {
    [quarter: string]: {
        [rdBand: string]: {     
            wins: number;
            draws: number;
            losses: number;
        };
    };
}

interface OpacityByRD {
    [key: string]: string;
}

const opacityByRD : OpacityByRD = {
    'Less than -300': '0.65',
    '-300 to -200': '0.7',
    '-200 to -100': '0.75',
    '-100 to 0': '0.8',
    '0 to 100': '0.85',
    '100 to 200': '0.9',
    '200 to 300': '0.95',
    'Greater than 300': '1.0',
}

export default function WinLossByQuarterRDChart({winLossByQuarterRD}: { winLossByQuarterRD: QuarterData }) {
    
    const labels = Object.keys(winLossByQuarterRD);
    const ratingBands = Object.keys(Object.values(winLossByQuarterRD)[0]);

    const options = {
        plugins: { 
            title: { 
                display: true,
                text: 'Results by Quarter & Rating Difference',
            }
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,                
            },
            y: {
                stacked: true,                
            },
        }
    };

    const datasets: { 
        label: string; 
        data: number[]; 
        backgroundColor: string; 
        stack: string; 
    }[] = [];
    ratingBands.forEach((band) => {
        datasets.push({
            label: 'Losses ' + band,
            data: labels.map((quarter) => winLossByQuarterRD[quarter][band]?.losses),
            backgroundColor: 'rgba(255, 128, 128, ' + opacityByRD[band] + ')',
            stack: band,
        });
        datasets.push({
            label: 'Draws ' + band,
            data: labels.map((quarter) => winLossByQuarterRD[quarter][band]?.draws),
            backgroundColor: 'rgba(128, 128, 128, ' + opacityByRD[band] + ')',
            stack: band,
        });
        datasets.push({
            label: 'Wins ' + band,
            data: labels.map((quarter) => winLossByQuarterRD[quarter][band]?.wins),
            backgroundColor: 'rgba(128, 255, 128, ' + opacityByRD[band] + ')',
            stack: band,
        });
    });

    const data = {
        labels: labels,
        datasets: datasets,    
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
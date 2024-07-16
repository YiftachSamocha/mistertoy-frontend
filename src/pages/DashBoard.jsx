import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import faker from 'faker';
import { dashboardService } from '../services/dashboard.service.js';
import { toyService } from '../services/toy.service.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);



export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
}






export function DashBoard() {
    const [priceChart, setPriceChart] = useState([])
    const [inStockChart, setInStockChart] = useState([])
    const [currLabel, setCurrLabel] = useState({ label: '', inStock: 50 })
    const labels = toyService.getLabels()

    useEffect(() => {
        dashboardService.getPricesByLabelChart()
            .then(chart => setPriceChart(chart))
        dashboardService.getInstockByLabelChart()
            .then(chart => {
                setInStockChart(chart)
                setCurrLabel(chart[0])
            })
    }, [])


    const priceData = {
        labels: priceChart.map(label => label.name),
        datasets: [
            {
                label: 'Price',
                data: priceChart.map(label => label.price),
                backgroundColor: '#333333',
            }
        ]
    }

    const inStockData = {
        labels: ['In Stock', 'Out of Stock'],
        datasets: [
            {
                label: currLabel.name,
                data: [currLabel.inStock, (100 - currLabel.inStock)],
                backgroundColor: [
                    '#73A94B',
                    '#D04424',

                ],
                borderColor: [
                    '#333333',
                    '#333333',
                ],
                borderWidth: 1,
            },
        ],
    };

    function changeLabel({ target }) {
        const { value } = target
        const labelToSet = inStockChart.find(label => label.name === value)
        setCurrLabel(labelToSet)

    }
    return <section className='dashboard'>
        <h1>Average Prices by Labels</h1>
        <Bar options={options} data={priceData} />
        <h1>Percentage of Toys in Stock by Labels</h1>
        <select name="" id="" onChange={changeLabel} value={currLabel.name}>
            {labels.map(label => {
                return <option value={label} key={label}>{label}</option>
            })}

        </select>

        <div className='pie-container'>
            <Pie data={inStockData} />
        </div>

    </section>

}

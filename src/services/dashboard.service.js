import { toyService } from "./toy.service.js"

export const dashboardService = { getPricesByLabelChart, getInstockByLabelChart }

async function getInstockByLabelChart() {
    const toys = await toyService.query()
    const labels = toyService.getLabels()
    let chart = []
    for (var i = 0; i < labels.length; i++) {
        const name = labels[i]
        const inStock = _getInstock(toys, name)
        chart.push({ name, inStock })
    }
    return chart


}

async function getPricesByLabelChart() {
    const toys = await toyService.query()
    const labels = toyService.getLabels()
    let chart = []
    for (var i = 0; i < labels.length; i++) {
        const name = labels[i]
        const price = _getAvgPrice(toys, name)
        chart.push({ name, price })
    }
    return chart
}

function _getInstock(toys, name) {
    const toysWithLabel = toys.filter(toy => toy.labels.includes(name))
    const toysInStock = toysWithLabel.filter(toy => toy.inStock)
    const inStock = ((toysInStock.length) / (toysWithLabel.length))
    return (inStock * 100).toFixed(2)
}

function _getAvgPrice(toys, name) {
    const toysWithLabel = toys.filter(toy => toy.labels.includes(name))
    let sum = 0
    for (var i = 0; i < toysWithLabel.length; i++) {
        sum += toysWithLabel[i].price
    }
    const avg = (sum / toysWithLabel.length).toFixed(2)
    return avg

}
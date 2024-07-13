import { useSelector } from "react-redux"
import { ToyPreview } from "./ToyPreview.jsx"
import { toyService } from "../services/toy.service.js"
import { useEffect, useState } from "react"

export function ToyList() {
    const [toys, setToys] = useState([])
    useEffect(() => {
        toyService.query()
            .then(res => setToys(res))
    })
    if (toys.length === 0) return
    return <section className="toy-list">
        {toys.map(toy => {
            return <ToyPreview toy={toy} />
        })}

    </section>
}
import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { utilService } from "../services/util.service.js";


export function GoogleMap() {
    const initalState = {
        coords: { lat: 32.0853, lng: 34.7818 },
        zoom: 8,
    }
    const [coords, setCoords] = useState(initalState.coords)
    const [zoom, setZoom] = useState(initalState.zoom)
    const shops = utilService.getShopsCoords()

    const ShopButton = ({ name, lat, lng }) => <button onClick={() => zoomToShop({ lat, lng })} >{name}</button>

    function zoomToShop({ lat, lng }) {
        setCoords({ lat, lng })
        setZoom(14)
    }

    function setInital() {
        setCoords(initalState.coords)
        setZoom(initalState.zoom)
    }

    return (
        <div style={{ height: '80vh', width: '50%' }} className="map-container">
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCAqcL5arG9eTzRzMjYoAFOa3WlJeManoc" }}
                center={coords}
                zoom={zoom}
            >
                {shops.map(shop => {
                    return <ShopButton
                        name={shop.name}
                        lat={shop.lat}
                        lng={shop.lng}
                        key={shop.name}
                    />
                })}

            </GoogleMapReact>
            <button onClick={setInital}>All Shops</button>
        </div>
    )
}
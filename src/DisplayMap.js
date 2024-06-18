import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const DisplayMap = () => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        const jsonData = localStorage.getItem('restaurantPlan');
        if (jsonData) {
            const data = JSON.parse(jsonData);
            setTables(data.tables);
        }
    }, []);

    const bookTable = (id) => {
        alert(`Table ${id} booked!`);
    };

    return (
        <MapContainer
            center={[500, 1000]}
            zoom={-1}
            minZoom={-2}
            maxZoom={2}
            style={{ height: '500px', width: '100%' }}
            crs={L.CRS.Simple}
        >
            <TileLayer url="" />
            {tables.map((table) => (
                <Marker key={table.id} position={table.position}>
                    <Popup>
                        <div>
                            <h2>Table {table.number}</h2>
                            <p>Seats: {table.seats}</p>
                            <button onClick={() => bookTable(table.id)}>Book Table</button>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default DisplayMap;

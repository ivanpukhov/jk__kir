import React, { useState } from 'react';
import { MapContainer, ImageOverlay, useMapEvents, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const CreateMap = ({ setJsonData }) => {
    const [fieldSize, setFieldSize] = useState({ width: 2000, height: 1000 });
    const [tables, setTables] = useState([]);
    const [tableId, setTableId] = useState(1);
    const [seats, setSeats] = useState(2);
    const [selectedPosition, setSelectedPosition] = useState(null);

    const handleMapClick = (e) => {
        setSelectedPosition(e.latlng);
    };

    const addTable = () => {
        if (selectedPosition) {
            const newTable = {
                id: tableId,
                number: tableId,
                seats: seats,
                position: [selectedPosition.lat, selectedPosition.lng],
            };
            setTables([...tables, newTable]);
            setTableId(tableId + 1);
            setSelectedPosition(null);
        }
    };

    const saveToLocalStorage = () => {
        const jsonData = JSON.stringify({ tables });
        localStorage.setItem('restaurantPlan', jsonData);
        setJsonData(jsonData);
    };

    const MapClickHandler = () => {
        useMapEvents({
            click: handleMapClick,
        });
        return null;
    };

    return (
        <div>
            <div>
                <label>
                    Ширина поля:
                    <input
                        type="number"
                        value={fieldSize.width}
                        onChange={(e) => setFieldSize({ ...fieldSize, width: +e.target.value })}
                    />
                </label>
                <label>
                    Высота поля:
                    <input
                        type="number"
                        value={fieldSize.height}
                        onChange={(e) => setFieldSize({ ...fieldSize, height: +e.target.value })}
                    />
                </label>
                <label>
                    Количество мест за столиком:
                    <input type="number" value={seats} onChange={(e) => setSeats(+e.target.value)} />
                </label>
                <button onClick={addTable}>Добавить столик</button>
                <button onClick={saveToLocalStorage}>Сохранить план</button>
            </div>
            <MapContainer
                center={[fieldSize.height / 2, fieldSize.width / 2]}
                zoom={-1}
                minZoom={-2}
                maxZoom={2}
                style={{ height: '500px', width: '100%' }}
                crs={L.CRS.Simple}
                bounds={[[0, 0], [fieldSize.height, fieldSize.width]]}
            >
                <ImageOverlay
                    url=""
                    bounds={[[0, 0], [fieldSize.height, fieldSize.width]]}
                />
                <MapClickHandler />
                {tables.map((table) => (
                    <Marker key={table.id} position={table.position}>
                        <Popup>
                            <div>
                                <h2>Table {table.number}</h2>
                                <p>Seats: {table.seats}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default CreateMap;

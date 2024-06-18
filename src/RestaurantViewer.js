import React, { useState, useEffect } from 'react';
import { Stage, Layer, Rect, Circle } from 'react-konva';
import Modal from 'react-modal';

const RestaurantViewer = () => {
    const [tables, setTables] = useState([]);
    const [chairs, setChairs] = useState([]);
    const [sofas, setSofas] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);

    useEffect(() => {
        const savedTables = JSON.parse(localStorage.getItem('restaurantTables'));
        const savedChairs = JSON.parse(localStorage.getItem('restaurantChairs'));
        const savedSofas = JSON.parse(localStorage.getItem('restaurantSofas'));
        if (savedTables) {
            setTables(savedTables);
        }
        if (savedChairs) {
            setChairs(savedChairs);
        }
        if (savedSofas) {
            setSofas(savedSofas);
        }
    }, []);

    const handleTableClick = (table) => {
        setSelectedTable(table);
    };

    return (
        <div>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {tables.map((table) => (
                        <React.Fragment key={table.id}>
                            <Rect
                                {...table}
                                onClick={() => handleTableClick(table)}
                                onTap={() => handleTableClick(table)}
                            />
                            {chairs.filter(chair => chair.tableId === table.id).map(chair => (
                                <Circle key={chair.id} {...chair} />
                            ))}
                        </React.Fragment>
                    ))}
                    {sofas.map((sofa) => (
                        <Rect
                            key={sofa.id}
                            {...sofa}
                            cornerRadius={10}
                            onClick={() => handleTableClick(sofa)}
                            onTap={() => handleTableClick(sofa)}
                        />
                    ))}
                </Layer>
            </Stage>
            {selectedTable && (
                <Modal
                    isOpen={!!selectedTable}
                    onRequestClose={() => setSelectedTable(null)}
                >
                    <h2>Table {selectedTable.id}</h2>
                    <button onClick={() => setSelectedTable(null)}>Close</button>
                </Modal>
            )}
        </div>
    );
};

export default RestaurantViewer;

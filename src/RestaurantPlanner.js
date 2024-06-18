import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Rect, Circle, Transformer } from 'react-konva';

const Table = ({ table, isSelected, onSelect, onChange, onDelete }) => {
    const shapeRef = useRef();
    const trRef = useRef();

    useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <>
            <Rect
                ref={shapeRef}
                {...table}
                draggable
                onClick={onSelect}
                onTap={onSelect}
                onDragEnd={e => {
                    onChange({
                        ...table,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={e => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...table,
                        x: node.x(),
                        y: node.y(),
                        width: node.width() * scaleX,
                        height: node.height() * scaleY,
                    });
                }}
            />
            {isSelected && (
                <>
                    <Transformer ref={trRef} />
                    <button
                        style={{ position: 'absolute', top: table.y, left: table.x }}
                        onClick={() => onDelete(table.id, 'table')}
                    >
                        Delete
                    </button>
                </>
            )}
        </>
    );
};

const Chair = ({ chair, isSelected, onSelect, onChange, onDelete }) => {
    const shapeRef = useRef();
    const trRef = useRef();

    useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <>
            <Circle
                ref={shapeRef}
                {...chair}
                draggable
                onClick={onSelect}
                onTap={onSelect}
                onDragEnd={e => {
                    onChange({
                        ...chair,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={e => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...chair,
                        x: node.x(),
                        y: node.y(),
                        radius: node.radius() * Math.max(scaleX, scaleY),
                    });
                }}
            />
            {isSelected && (
                <>
                    <Transformer ref={trRef} />
                    <button
                        style={{ position: 'absolute', top: chair.y, left: chair.x }}
                        onClick={() => onDelete(chair.id, 'chair')}
                    >
                        Delete
                    </button>
                </>
            )}
        </>
    );
};

const Sofa = ({ sofa, isSelected, onSelect, onChange, onDelete }) => {
    const shapeRef = useRef();
    const trRef = useRef();

    useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <>
            <Rect
                ref={shapeRef}
                {...sofa}
                cornerRadius={10}
                draggable
                onClick={onSelect}
                onTap={onSelect}
                onDragEnd={e => {
                    onChange({
                        ...sofa,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={e => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...sofa,
                        x: node.x(),
                        y: node.y(),
                        width: node.width() * scaleX,
                        height: node.height() * scaleY,
                    });
                }}
            />
            {isSelected && (
                <>
                    <Transformer ref={trRef} />
                    <button
                        style={{ position: 'absolute', top: sofa.y, left: sofa.x }}
                        onClick={() => onDelete(sofa.id, 'sofa')}
                    >
                        Delete
                    </button>
                </>
            )}
        </>
    );
};

const RestaurantPlanner = () => {
    const [tables, setTables] = useState([]);
    const [chairs, setChairs] = useState([]);
    const [sofas, setSofas] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [newTableColor, setNewTableColor] = useState('#000000');
    const [newChairColor, setNewChairColor] = useState('#000000');
    const [newSofaColor, setNewSofaColor] = useState('#000000');

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

    useEffect(() => {
        localStorage.setItem('restaurantTables', JSON.stringify(tables));
    }, [tables]);

    useEffect(() => {
        localStorage.setItem('restaurantChairs', JSON.stringify(chairs));
    }, [chairs]);

    useEffect(() => {
        localStorage.setItem('restaurantSofas', JSON.stringify(sofas));
    }, [sofas]);

    const addTable = () => {
        const id = tables.length ? tables[tables.length - 1].id + 1 : 1;
        setTables([
            ...tables,
            {
                x: 50,
                y: 50,
                width: 100,
                height: 100,
                fill: newTableColor,
                id,
            },
        ]);
    };

    const addChair = (tableId) => {
        const id = chairs.length ? chairs[chairs.length - 1].id + 1 : 1;
        setChairs([
            ...chairs,
            {
                x: 50,
                y: 50,
                radius: 15,
                fill: newChairColor,
                id,
                tableId,
            },
        ]);
    };

    const addSofa = () => {
        const id = sofas.length ? sofas[sofas.length - 1].id + 1 : 1;
        setSofas([
            ...sofas,
            {
                x: 50,
                y: 50,
                width: 100,
                height: 50,
                fill: newSofaColor,
                id,
            },
        ]);
    };

    const handleTableChange = (newAttrs) => {
        const newTables = tables.slice();
        const index = newTables.findIndex(table => table.id === newAttrs.id);
        newTables[index] = newAttrs;
        setTables(newTables);
    };

    const handleChairChange = (newAttrs) => {
        const newChairs = chairs.slice();
        const index = newChairs.findIndex(chair => chair.id === newAttrs.id);
        newChairs[index] = newAttrs;
        setChairs(newChairs);
    };

    const handleSofaChange = (newAttrs) => {
        const newSofas = sofas.slice();
        const index = newSofas.findIndex(sofa => sofa.id === newAttrs.id);
        newSofas[index] = newAttrs;
        setSofas(newSofas);
    };

    const handleDelete = (id, type) => {
        if (type === 'table') {
            setTables(tables.filter(table => table.id !== id));
            setChairs(chairs.filter(chair => chair.tableId !== id));
        } else if (type === 'chair') {
            setChairs(chairs.filter(chair => chair.id !== id));
        } else if (type === 'sofa') {
            setSofas(sofas.filter(sofa => sofa.id !== id));
        }
    };

    return (
        <div>
            <input
                type="color"
                value={newTableColor}
                onChange={(e) => setNewTableColor(e.target.value)}
            />
            <button onClick={addTable}>Add Table</button>
            <input
                type="color"
                value={newChairColor}
                onChange={(e) => setNewChairColor(e.target.value)}
            />
            <button onClick={() => addChair(selectedId)}>Add Chair</button>
            <input
                type="color"
                value={newSofaColor}
                onChange={(e) => setNewSofaColor(e.target.value)}
            />
            <button onClick={addSofa}>Add Sofa</button>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={(e) => {
                    const clickedOnEmpty = e.target === e.target.getStage();
                    if (clickedOnEmpty) {
                        setSelectedId(null);
                    }
                }}
            >
                <Layer>
                    {tables.map((table) => (
                        <Table
                            key={table.id}
                            table={table}
                            isSelected={table.id === selectedId}
                            onSelect={() => setSelectedId(table.id)}
                            onChange={handleTableChange}
                            onDelete={handleDelete}
                        />
                    ))}
                    {chairs.map((chair) => (
                        <Chair
                            key={chair.id}
                            chair={chair}
                            isSelected={chair.id === selectedId}
                            onSelect={() => setSelectedId(chair.id)}
                            onChange={handleChairChange}
                            onDelete={handleDelete}
                        />
                    ))}
                    {sofas.map((sofa) => (
                        <Sofa
                            key={sofa.id}
                            sofa={sofa}
                            isSelected={sofa.id === selectedId}
                            onSelect={() => setSelectedId(sofa.id)}
                            onChange={handleSofaChange}
                            onDelete={handleDelete}
                        />
                    ))}
                </Layer>
            </Stage>
        </div>
    );
};

export default RestaurantPlanner;

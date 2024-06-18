import React, { useState, useEffect } from 'react';

const PropertiesPanel = ({ element, updateElement, deleteElement }) => {
    const [color, setColor] = useState(element.fill);
    const [borderColor, setBorderColor] = useState(element.borderColor);
    const [width, setWidth] = useState(element.width);
    const [height, setHeight] = useState(element.height);
    const [rotation, setRotation] = useState(element.rotation);

    useEffect(() => {
        setColor(element.fill);
        setBorderColor(element.borderColor);
        setWidth(element.width);
        setHeight(element.height);
        setRotation(element.rotation);
    }, [element]);

    const handleColorChange = (e) => {
        setColor(e.target.value);
        updateElement(element.id, { fill: e.target.value });
    };

    const handleBorderColorChange = (e) => {
        setBorderColor(e.target.value);
        updateElement(element.id, { borderColor: e.target.value });
    };

    const handleWidthChange = (e) => {
        setWidth(e.target.value);
        updateElement(element.id, { width: parseInt(e.target.value, 10) });
    };

    const handleHeightChange = (e) => {
        setHeight(e.target.value);
        updateElement(element.id, { height: parseInt(e.target.value, 10) });
    };

    const handleRotationChange = (e) => {
        setRotation(e.target.value);
        updateElement(element.id, { rotation: parseInt(e.target.value, 10) });
    };

    return (
        <div style={{ padding: '10px', borderLeft: '1px solid #ccc', width: '300px' }}>
            <h3>Properties</h3>
            <label>
                Color:
                <input type="color" value={color} onChange={handleColorChange} />
            </label>
            <label>
                Border Color:
                <input type="color" value={borderColor} onChange={handleBorderColorChange} />
            </label>
            {element.type !== 'chair' && (
                <label>
                    Width:
                    <input type="number" value={width} onChange={handleWidthChange} />
                </label>
            )}
            {element.type !== 'chair' && (
                <label>
                    Height:
                    <input type="number" value={height} onChange={handleHeightChange} />
                </label>
            )}
            <label>
                Rotation:
                <input type="number" value={rotation} onChange={handleRotationChange} />
            </label>
            <button onClick={() => deleteElement(element.id)}>Delete</button>
        </div>
    );
};

export default PropertiesPanel;
